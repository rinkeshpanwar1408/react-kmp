import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Checkbox, Empty, Form, Input, Modal, PageHeader, Space, Switch, Table, Tag, Tooltip, Tree } from "antd";
import { HomeOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import * as RouteUrl from "../../../model/route";
import CustomRow from "../../../components/CustomRow";
import CustomCol from "../../../components/CustomCol";
import { StyledCard } from "../../../styled-components/CommonControls";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreators from "../../../store/action/sourceConfigActions";
import useMessage from "../../../hooks/useMessage";
import CustomPopover from "../../../components/CustomPopover";
import { BiNetworkChart } from "react-icons/bi";
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "../../../utility/utils"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomModal from "../../../components/CustomModal";

const entitiesMock = {
    columnIds: ["todo", "done"],
    columns: {
        todo: {
            id: "todo",
            title: "To do",
            data: [],
        },
        done: {
            id: "done",
            title: "Done",
            data: []
        }
    }
};

const COLUMN_ID_DONE = "done";
const PRIMARY_BUTTON_NUMBER = 0;

function CreateWorkSpace(props) {
    const [entities, setEntities] = useState(entitiesMock);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [draggingTaskId, setDraggingTaskId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [CreateSourceForm] = Form.useForm();
    const [isLoadingdata, setIsLoadingdata] = useState(false);
    const SourceConfigList = useSelector(state => state.sourceConfig.SourceConfigs);
    const dispatch = useDispatch();

    const {
        ShowSuccessMessage,
        ShowErrorMessage,
        ShowWarningMessage,
    } = useMessage()

    useEffect(() => {
        const newList = { ...entitiesMock };
        newList.columns["todo"].data = SourceConfigList
        setEntities(newList)
    }, [SourceConfigList])


    useEffect(() => {
        try {
            const getData = async () => {
                setIsLoadingdata(true);
                const response = await dispatch(ActionCreators.GetSourceConfigList());
                setIsLoadingdata(false);
            }
            getData();
        }
        catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }, [dispatch])

    const tableColumns = [
        {
            title: 'Config Name',
            dataIndex: 'config_name',
            key: 'config_name',
            width: "50%"
        },
        {
            title: 'Source Type',
            dataIndex: 'source_type',
            key: 'source_type',
            width: "40%"
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <CustomPopover
                    placement="bottom"
                    title={<span>Tree</span>}
                    content={<Tree
                        treeData={text.selected_item_tree}
                        autoExpandParent={true}
                        expandedKeys={text.parent_items}
                        fieldNames={{
                            title: "title", key: "id", children: "children"
                        }}
                    />} trigger="click">
                    <Button shape="circle" icon={<BiNetworkChart fontSize="25" />} />
                </CustomPopover>
            ),
        },
    ];


    /**
     * On window click
     */
    const onWindowClick = useCallback((e) => {
        if (e.defaultPrevented) {
            return;
        }
        setSelectedTaskIds([]);
    }, []);

    /**
     * On window key down
     */
    const onWindowKeyDown = useCallback((e) => {
        if (e.defaultPrevented) {
            return;
        }

        if (e.key === "Escape") {
            setSelectedTaskIds([]);
        }
    }, []);

    /**
     * On window touch end
     */
    const onWindowTouchEnd = useCallback((e) => {
        if (e.defaultPrevented) {
            return;
        }
        setSelectedTaskIds([]);
    }, []);

    /**
     * Event Listener
     */
    useEffect(() => {
        window.addEventListener("click", onWindowClick);
        window.addEventListener("keydown", onWindowKeyDown);
        window.addEventListener("touchend", onWindowTouchEnd);

        return () => {
            window.removeEventListener("click", onWindowClick);
            window.removeEventListener("keydown", onWindowKeyDown);
            window.removeEventListener("touchend", onWindowTouchEnd);
        };
    }, [onWindowClick, onWindowKeyDown, onWindowTouchEnd]);

    /**
     * Droppable table body
     */
    const DroppableTableBody = ({ columnId, tasks, ...props }) => {
        return (
            <Droppable
                droppableId={columnId}
            >
                {(provided, snapshot) => (
                    <tbody
                        ref={provided.innerRef}
                        {...props}
                        {...provided.droppableProps}
                        className={`${props.className} ${snapshot.isDraggingOver && columnId === COLUMN_ID_DONE
                            ? "is-dragging-over"
                            : ""
                            }`}
                    >
                    </tbody>

                )}
            </Droppable>
        );
    };

    /**
     * Draggable table row
     */
    const DraggableTableRow = ({ index, record, columnId, tasks, ...props }) => {
        if (!tasks.length) {
            return (
                <tr className="ant-table-placeholder row-item" {...props}>
                    <td colSpan={tableColumns.length} className="ant-table-cell">
                        <div className="ant-empty ant-empty-normal">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </td>
                </tr>
            );
        }

        const isSelected = selectedTaskIds.some(
            (selectedTaskId) => selectedTaskId.id === record.id
        );
        const isGhosting =
            isSelected && Boolean(draggingTaskId) && draggingTaskId.id !== record.id;

        return (
            <Draggable
                key={props["data-row-key"]}
                draggableId={props["data-row-key"].toString()}
                index={index}
            >
                {(provided, snapshot) => {
                    return (
                        <tr
                            ref={provided.innerRef}
                            {...props}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`row-item ${isSelected ? "row-selected" : ""} ${isGhosting ? "row-ghosting" : ""
                                } ${snapshot.isDragging ? "row-dragging" : ""}`}
                        // onClick={onClick}
                        // onTouchEnd={onTouchEnd}
                        // onKeyDown={event => onKeyDown(event, provided, snapshot)}
                        ></tr>
                    );
                }}
            </Draggable>
        );
    };


    /**
     * On before capture
     */
    const onBeforeCapture = (start) => {
        const draggableId = start.draggableId;
        const selected = selectedTaskIds.find((taskId) => taskId.id === parseInt(draggableId));

        // if dragging an item that is not selected - unselect all items
        if (!selected) {
            setSelectedTaskIds([]);
        }

        setDraggingTaskId(draggableId);
    };

    /**
     * On drag end
     */
    const onDragEnd = (result) => {
        const destination = result.destination;
        const source = result.source;

        // nothing to do
        if (!destination || result.reason === "CANCEL") {
            setDraggingTaskId(null);
            return;
        }
        const processed = mutliDragAwareReorder({
            entities,
            selectedTaskIds,
            source,
            destination
        });


        setEntities(processed.entities);
        setDraggingTaskId(null);
    };

    /**
     * Toggle selection
     */
    const toggleSelection = (taskId) => {
        const wasSelected = selectedTaskIds.filter(item => item.id === taskId.id).length > 0;

        const newTaskIds = (() => {
            // Task was not previously selected
            // now will be the only selected item
            if (!wasSelected) {
                return [taskId];
            }

            // Task was part of a selected group
            // will now become the only selected item
            if (selectedTaskIds.length > 1) {
                return [taskId];
            }

            // task was previously selected but not in a group
            // we will now clear the selection
            return [];
        })();

        setSelectedTaskIds(newTaskIds);
    };

    /**
     * Toggle selection in group
     */
    const toggleSelectionInGroup = (taskId) => {
        const index = selectedTaskIds.indexOf(taskId);

        // if not selected - add it to the selected items
        if (index === -1) {
            setSelectedTaskIds([...selectedTaskIds, taskId]);

            return;
        }

        // it was previously selected and now needs to be removed from the group
        const shallow = [...selectedTaskIds];
        shallow.splice(index, 1);

        setSelectedTaskIds(shallow);
    };

    /**
     * Multi select to
     * This behaviour matches the MacOSX finder selection
     */
    const multiSelectTo = (newTaskId) => {
        const updated = multiSelect(entities, selectedTaskIds, newTaskId);
        if (updated == null) {
            return;
        }
        setSelectedTaskIds(updated);
    };

    /**
     * On click to row
     * Using onClick as it will be correctly
     * preventing if there was a drag
     */
    const onClickRow = (e, record) => {
        if (e.defaultPrevented) {
            return;
        }

        if (e.button !== PRIMARY_BUTTON_NUMBER) {
            return;
        }

        // marking the event as used
        e.preventDefault();
        performAction(e, record);
    };

    /**
     * On touch end from row
     */
    const onTouchEndRow = (e, record) => {
        if (e.defaultPrevented) {
            return;
        }

        // marking the event as used
        // we would also need to add some extra logic to prevent the click
        // if this element was an anchor
        e.preventDefault();
        toggleSelectionInGroup(record.id);
    };

    /**
     * Was toggle in selection group key used
     * Determines if the platform specific toggle selection in group key was used
     */
    const wasToggleInSelectionGroupKeyUsed = (e) => {
        const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
        return isUsingWindows ? e.ctrlKey : e.metaKey;
    };

    /**
     * Was multi select key used
     * Determines if the multiSelect key was used
     */
    const wasMultiSelectKeyUsed = (e) => e.shiftKey;

    /**
     * Perform action
     */
    const performAction = (e, record) => {
        if (wasToggleInSelectionGroupKeyUsed(e)) {
            toggleSelectionInGroup(record);
            return;
        }
        if (wasMultiSelectKeyUsed(e)) {
            multiSelectTo(record);
            return;
        }

        toggleSelection(record);
    };

    const submitHandler = async () => {
        try {
            const values = await CreateSourceForm.validateFields();
        }
        catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
        finally {
        }
    };

    return (
        <React.Fragment>
            <CustomRow>
                <CustomCol xl={24}>
                    <PageHeader
                        title="Create WorkSpace"
                        className="FormPageHeader"
                        extra={[
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                                        <HomeOutlined />
                                    </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                                        Sources
                                    </Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        ]}
                    >
                    </PageHeader>

                    <DragDropContext
                        onBeforeCapture={onBeforeCapture}
                        onDragEnd={onDragEnd}
                    >
                        <CustomRow>
                            <CustomCol xl={12}>
                                <StyledCard title="Configurations" className={`formContainer c-multi-drag-table ${draggingTaskId ? "is-dragging" : ""}`}>
                                    <Table
                                        bordered
                                        pagination={false}
                                        dataSource={entities.columns["todo"].data}
                                        columns={tableColumns}
                                        rowKey="id"
                                        components={{
                                            body: {
                                                // Custom tbody
                                                wrapper: (val) =>
                                                    DroppableTableBody({
                                                        columnId: entities.columns["todo"].id,
                                                        tasks: entities.columns["todo"].data,
                                                        ...val
                                                    }),
                                                // Custom td
                                                row: (val) => {
                                                    return DraggableTableRow({
                                                        tasks: entities.columns["todo"].data,
                                                        ...val
                                                    })
                                                }

                                            }
                                        }}
                                        // Set props on per row (td)
                                        onRow={(record, index) => ({
                                            index,
                                            record,
                                            onClick: (e) => onClickRow(e, record),
                                            onTouchEnd: (e) => onTouchEndRow(e, record)
                                        })}
                                    />
                                </StyledCard>
                            </CustomCol>
                            <CustomCol xl={12}>
                                <StyledCard title="Selected Configurations" className={`formContainer c-multi-drag-table ${draggingTaskId ? "is-dragging" : ""}`}>
                                    <Table
                                        bordered
                                        dataSource={entities.columns["done"].data}
                                        columns={tableColumns}
                                        rowKey="id"
                                        pagination={false}
                                        components={{
                                            body: {
                                                // Custom tbody
                                                wrapper: (val) =>
                                                    DroppableTableBody({
                                                        columnId: entities.columns["done"].id,
                                                        tasks: entities.columns["done"].data,
                                                        ...val
                                                    }),
                                                // Custom td
                                                row: (val) => {
                                                    return DraggableTableRow({
                                                        tasks: entities.columns["done"].data,
                                                        ...val
                                                    })
                                                }

                                            }
                                        }}
                                        // Set props on per row (td)
                                        onRow={(record, index) => ({
                                            index,
                                            record,
                                            onClick: (e) => onClickRow(e, record),
                                            onTouchEnd: (e) => onTouchEndRow(e, record)
                                        })}
                                    />
                                    <CustomRow >
                                        <CustomCol xxl={24} xl={24} className="text-right m-t-10">
                                            <Button type="primary" onClick={() => setIsModalVisible(true)} >
                                                Create Workspace
                                            </Button>
                                        </CustomCol>
                                    </CustomRow>
                                </StyledCard>
                            </CustomCol>
                        </CustomRow>
                    </DragDropContext>
                </CustomCol >
            </CustomRow >

            <CustomModal
                title="Workspace details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                width={"30%"}
                footer={
                    <Button type="primary" onClick={() => setIsModalVisible(false)}>Save</Button>
                }
            >
                <Form
                    name="basic"
                    layout="vertical"
                    size="large"
                    autocomplete="off"
                    onFinish={submitHandler}
                    form={CreateSourceForm}
                >

                    <CustomRow key="rw2">
                        <CustomCol key="rw2.1" >
                            <Form.Item
                                name="base_url"
                                label='Workspace Name'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Workspace Name!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter Workspace Name"
                                />
                            </Form.Item>
                        </CustomCol>

                        <CustomCol key="rw2.2" >
                            <Form.Item name="retriveattachments" valuePropName="checked" noStyle>
                                <Checkbox defaultChecked={true}>Set Default Workspace</Checkbox>
                            </Form.Item>
                        </CustomCol>

                    </CustomRow>
                </Form>
            </CustomModal>
        </React.Fragment>
    );
}

export default CreateWorkSpace;
