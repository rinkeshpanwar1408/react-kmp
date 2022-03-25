import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Divider, Empty, Form, Input, InputNumber, Menu, PageHeader, Popover, Progress, Radio, Select, Space, Steps, Table, Tabs, Tag, Tooltip, Tree, Typography } from "antd";
import CustomRow from "../../components/CustomRow";
import CustomCol from "../../components/CustomCol";
import { FiSliders } from "react-icons/fi";
import { StyledCard } from "../../styled-components/CommonControls";
import { useDispatch, useSelector } from "react-redux";
import * as SourceActionCreator from "../../store/action/sourceActions";
import useMessage from "../../hooks/useMessage";
import * as ActionCreators from "../../store/action/sourceConfigActions";
import CustomPopover from "../../components/CustomPopover";
import { BiNetworkChart } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "../../utility/utils"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../model/route";
import ConfigurationSwitch from "../../components/ConfigurationSwitch";
import ConfigureInptItem from "../../components/ConfigureInptItem";
import * as ActionCreator from "../../store/action/workspaceActions";

const { Step } = Steps;
const { Text } = Typography
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const steps = [
    {
        key: 'step-1',
        title: 'WorkSpace Details',
    },
    {
        key: 'step-2',
        title: 'Select Source',
    },
    {
        key: 'step-3',
        title: 'Select Configuration',
    },
    {
        key: 'step-4',
        title: 'Ingestion Settings',
    },
    {
        key: 'step-5',
        title: 'Job Details',
    },
    {
        key: 'step-6',
        title: 'Visualization Settings',
        isOptional: true
    },

];

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


function QuickSetup(props) {
    const UserDetail = useSelector(state => state.auth.UserDetail);

    const [selectedSources, setSelectedSources] = useState([]);

    const [entities, setEntities] = useState(entitiesMock);

    const [personalize_isSorting, setPersonalize_isSorting] = useState(false);
    const [categorize_isFacets, setCategorize_isFacets] = useState(false);


    const [current, setCurrent] = useState(0);
    const SourceList = useSelector(state => state.source.Sources);
    const [isLoadingdata, setIsLoadingdata] = useState(false);
    const dispatch = useDispatch();
    const RouteMatch = useRouteMatch();
    const history = useHistory();
    const {
        ShowSuccessMessage,
        ShowErrorMessage,
        ShowWarningMessage,
    } = useMessage();

    useEffect(() => {
        try {
            const getData = async () => {
                const response = await dispatch(SourceActionCreator.GetSources());
            }
            if (SourceList.length <= 0) {
                getData();
            }
        }
        catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }, [dispatch]);



    //#region Screen-1-Workspace
    const [WorkspaceForm] = Form.useForm();
    const SaveWorkSpaceDetail = async () => {
        try {
            let formValues = null;
            try {
                formValues = await WorkspaceForm.validateFields();
            } catch (error) {
                return;
            }

            const result = await dispatch(
                ActionCreator.CreateWorkSpace({
                    workspace_name: formValues.workspacename,
                    username: UserDetail.userName,
                    description: formValues.description
                }));
            setCurrent(current + 1);

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }
    //#endregion


    //#region Screen-2-Source
    useEffect(() => {
        try {
            const getData = async () => {
                setIsLoadingdata(true);
                const response = await dispatch(SourceActionCreator.GetSources());
                setIsLoadingdata(false);
            }
            getData();
        }
        catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }, [dispatch])


    const SourceColumns = [
        {
            title: 'Source Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Source Name',
            dataIndex: 'source_name',
            key: 'source_name',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Config Template',
            key: 'count',
            render: (text, record) => {
                if (parseInt(text.count) === 0) {
                    return <Tag color="error">0 Template</Tag>
                }
                return <Tag color="success">{`${text.count} Template`}</Tag>
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Tooltip title="Add Configuration Template">
                    <Button type="default" shape="circle" icon={<FiSliders fontSize="20" />} onClick={() => {
                        history.push({
                            pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
                            search: `source=${text.full_source_name}`
                        })
                    }} />
                </Tooltip>
            ),
        },
    ];

    const SaveSourcesToWorkSpace = async () => {
        try {
            const result = await dispatch(
                ActionCreator.SaveSourcesToWorkSpace({
                    workspace_name: "Workspace-1",
                    selected: selectedSources
                }));
            setCurrent(current + 1);

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }
    //#endregion

    //#endregion

    //#region Screen-3-WorkSpace

    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [draggingTaskId, setDraggingTaskId] = useState(null);

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
    //#endregion

    //#region Screen-4-Ingestion-Settings 
    const [IngestionSettingsForm] = Form.useForm();
    const [form] = Form.useForm();
    const SaveIngestionSettings = async () => {
        debugger;
        const data = await form.validateFields();

    }
    //#endregion

    //#region Screen-5-JobDetails
    const JobDetailsColumns = [
        {
            title: 'Job Name',
            dataIndex: 'jobname',
            key: 'jobname',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Document Count',
            dataIndex: 'documentcount',
            key: 'documentcount',
        },

        {
            title: 'Run By',
            dataIndex: 'runby',
            key: 'runby',
        },

        {
            title: 'Start Date Time',
            dataIndex: 'startdatetime',
            key: 'startdatetime',
        },

        {
            title: 'Job Run Type',
            dataIndex: 'jobruntype',
            key: 'jobruntype',
        },

        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space>
        //             <Tooltip title="Edit">
        //                 <Button type="primary" shape="circle" icon={<FiEdit fontSize="20" />}
        //                     onClick={() => onEditSourceHandler(text.full_source_name)} />
        //             </Tooltip>

        //             <Tooltip title="Delete">
        //                 <CustomPopconfirm
        //                     title="Are you sure to delete this source?"
        //                     okText="Yes"
        //                     cancelText="No"
        //                     onConfirm={() => onDeleteSourceHandler(text.full_source_name)}
        //                 >
        //                     <Button danger type="primary" shape="circle" icon={<FiTrash2 fontSize="20" />} />
        //                 </CustomPopconfirm>
        //             </Tooltip>

        //         </Space>
        //     ),
        // },
    ];
    //#endregion

    //#region Screen-6-View Setting

    //#endregion

    const onChange = current => {
        console.log('onChange:', current);
        setCurrent(current);
    };

    const next = () => {
        switch (current) {
            case 0:
                SaveWorkSpaceDetail();
                break;

            case 1:
                try {
                    SaveSourcesToWorkSpace();

                    const getData = async () => {
                        const response = await dispatch(ActionCreators.GetSourceConfigList(selectedSources));
                        const newList = { ...entitiesMock };
                        newList.columns["todo"].data = response?.data
                        setEntities(newList);
                    }
                    getData();
                }
                catch (error) {
                    ShowErrorMessage("Something Went Wrong");
                }
                break;

            case 3:
                try {
                    SaveIngestionSettings()
                }
                catch (error) {
                    ShowErrorMessage("Something Went Wrong");
                }
                break;

            default:
                break;
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    return (
        <CustomRow justify="center">
            <CustomCol xl={24}>
                <PageHeader title="Quick Setup" className="FormPageHeader">
                </PageHeader>

                <StyledCard className="formContainer">
                    <Steps className="quick_setup_form" iconPrefix="a" current={current} size="small" onChange={onChange}>
                        {steps.map(step => {
                            return <Step key={step.key} title={step.title} description={step.isOptional && "(Optional)"} />
                        })}
                    </Steps>
                    <div className={`quick_setup_form_content ${current === 0 && "active"}`}>
                        <Form
                            name="basic" layout="vertical"
                            size="large" autoComplete="off"
                            form={WorkspaceForm}>

                            <CustomRow key="rw1">
                                <CustomCol key="rw1.1" xl={10} >
                                    <Form.Item
                                        name="workspacename"
                                        label="Workspace Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Workspace Name!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter Workspace Name" />
                                    </Form.Item>
                                </CustomCol>
                            </CustomRow>

                            <CustomRow key="rw2">
                                <CustomCol key="rw2.1" xl={24} >
                                    <Form.Item
                                        name="description"
                                        label="Description"
                                    >
                                        <TextArea rows={4} placeholder="Enter Description" />
                                    </Form.Item>
                                </CustomCol>
                            </CustomRow>
                        </Form>
                    </div>
                    <div className={`quick_setup_form_content ${current === 1 && "active"}`}>
                        <CustomRow>
                            <CustomCol xl={24}>
                                <Table
                                    rowKey="id"
                                    columns={SourceColumns}
                                    dataSource={SourceList}
                                    bordered
                                    pagination={false}
                                    rowClassName={(record, index) => {
                                        return record.count <= 0 ? "error" : "selected"
                                    }}
                                    rowSelection={{
                                        type: "checkbox",
                                        // selectedRowKeys:[11],
                                        onChange: (selectedRowKeys, selectedRows) => {
                                            setSelectedSources(selectedRowKeys);
                                        },
                                    }}

                                />
                            </CustomCol>
                        </CustomRow>
                        <CustomRow>
                            <CustomCol className="text-right">
                                <Button className="m-t-10">Add New Source</Button>
                            </CustomCol>
                        </CustomRow>
                    </div>
                    <div className={`quick_setup_form_content ${current === 2 && "active"}`}>
                        <DragDropContext
                            onBeforeCapture={onBeforeCapture}
                            onDragEnd={onDragEnd}
                        >
                            <CustomRow>
                                <CustomCol xl={12}>
                                    <StyledCard title="Configurations" className={`inner-card c-multi-drag-table ${draggingTaskId ? "is-dragging" : ""}`}>
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
                                    <StyledCard title="Selected Configurations" className={`inner-card c-multi-drag-table ${draggingTaskId ? "is-dragging" : ""}`}>
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
                                    </StyledCard>
                                </CustomCol>
                            </CustomRow>
                        </DragDropContext>
                    </div>
                    <div className={`quick_setup_form_content ${current === 3 && "active"}`}>
                        <CustomRow>
                            <CustomCol xl={24}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="InjectionForm"
                                    autoComplete="off"
                                    size="large"
                                >
                                    <CustomRow>

                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Semantic_Search" initialValue={false}>
                                                <ConfigurationSwitch title="Include Semantic Search" />
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Include_OCR" initialValue={false}>
                                                <ConfigurationSwitch title="Include OCR" onValueChange={(val) => { }} />
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Include_Encrytpted_Documents" initialValue={false}>
                                                <ConfigurationSwitch title="Include encrytpted documents" />
                                            </Form.Item>
                                        </CustomCol>
                                    </CustomRow>

                                    <CustomRow>
                                        <CustomCol xl={8}>
                                            <Form.Item
                                                name="IngestionSetting_Include_Password_Protected"
                                                initialValue={false}
                                            >
                                                <ConfigurationSwitch title="Include password protected documents" />
                                            </Form.Item>
                                        </CustomCol>
                                        <CustomCol xl={8}>
                                            <Form.Item
                                                name="IngestionSetting_"
                                                initialValue={false}
                                            >
                                                <ConfigurationSwitch title="Include Summarization Toggle" />
                                            </Form.Item>
                                        </CustomCol>
                                    </CustomRow>

                                    <CustomRow>
                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_ML_Model" required label="Choose ML Model for vectorization">
                                                <Select
                                                    showSearch
                                                    placeholder="Select a ML Model"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option key={"op1"} value={"Modified Date"}>msmarco-roberta-base-v3</Option>
                                                    <Option key={"op2"} value={"Size"}>bert-large-nli-stsb-mean-tokens</Option>
                                                </Select>
                                            </Form.Item>

                                        </CustomCol>

                                        <CustomCol xl={12}>
                                            <Form.Item name="IngestionSetting_File_Types" required label="Include File types">
                                                <Select mode="multiple" allowClear placeholder="Please select">
                                                    <Option key={"op1"} value={".docx"}>.docx</Option>
                                                    <Option key={"op2"} value={".pdf"}>.pdf</Option>
                                                    <Option key={"op3"} value={".pptx"}>.pptx</Option>
                                                    <Option key={"op4"} value={".ppt"}>.ppt</Option>
                                                    <Option key={"op5"} value={".txt"}>.txt</Option>
                                                    <Option key={"op6"} value={".csv"}>.csv</Option>
                                                </Select>
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={4}>
                                            <Form.Item name="IngestionSetting_File_size" label="Limit the size of documents">
                                                <InputNumber placeholder="" />
                                            </Form.Item>
                                        </CustomCol>
                                    </CustomRow>

                                </Form>


                            
                            </CustomCol>
                        </CustomRow>
                    </div>
                    <div className={`quick_setup_form_content ${current === 4 && "active"}`}>
                        <CustomRow>
                            <CustomCol xl={15}>
                                <StyledCard title="Job List" className="inner-card">
                                    <Table columns={JobDetailsColumns} bordered pagination={false} />
                                </StyledCard>
                            </CustomCol>
                            <CustomCol xl={9}>
                                <StyledCard title="Add New Job" className="inner-card">
                                    <Form
                                        name="basic"
                                        layout="vertical"
                                        size="large"
                                        autoComplete="off"
                                    >
                                        <CustomRow key="rw2">

                                            <CustomCol key="rw2.1" >
                                                <Form.Item
                                                    name="workspace"
                                                    label="Configuration"
                                                    rules={[{
                                                        required: true, message: "Please select configuration!",
                                                    }]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Select a Configuration"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option key="wOp-1" value="wOption-1">{"Configuration-1"}</Option>
                                                        <Option key="wOp-2" value="wOption-2">{"Configuration-2"}</Option>
                                                        <Option key="wOp-3" value="wOption-3">{"Configuration-3"}</Option>
                                                        <Option key="wOp-4" value="wOption-4">{"Configuration-4"}</Option>
                                                    </Select>
                                                </Form.Item>
                                            </CustomCol>

                                            <CustomCol key="rw2.3" >
                                                <Form.Item
                                                    name="runtype"
                                                    label="Run Type"
                                                    rules={[{
                                                        required: true, message: "Please select run type!",
                                                    }]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Select a Run Type"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option key="Adhoc" value="Adhoc">Adhoc</Option>
                                                        <Option key="Scheduled" value="Scheduled">Scheduled</Option>
                                                    </Select>
                                                </Form.Item>
                                            </CustomCol>

                                            <CustomCol key="rw2.4" >
                                                <Form.Item
                                                    name="runtype"
                                                    label="Job Type"
                                                    rules={[{
                                                        required: true, message: "Please select job type!",
                                                    }]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Select a Job Type"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option key="fullingestion" value="fullingestion">Full Ingestion</Option>
                                                        <Option key="incrementalingestion" value="incrementalingestion">Incremental Ingestion</Option>
                                                    </Select>
                                                </Form.Item>
                                            </CustomCol>
                                        </CustomRow>

                                        <CustomRow key="rw3">
                                            <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                                <Space direction="horizontal">
                                                    <Button type="primary">
                                                        Create And Run
                                                    </Button>
                                                    <Button type="primary" htmlType="submit" >
                                                        Create
                                                    </Button>
                                                </Space>
                                            </CustomCol>
                                        </CustomRow>
                                    </Form>
                                </StyledCard>
                            </CustomCol>
                        </CustomRow>
                    </div>
                    <div className={`quick_setup_form_content ${current === 5 && "active"}`}>
                        <CustomRow>
                            <CustomCol xl={24}>
                                <Tabs defaultActiveKey="1" centered>
                                    <TabPane tab="Personlize Search" key="1">
                                        <CustomRow justify="center">
                                            <CustomCol xl={16} >
                                                <StyledCard className="inner-card">
                                                    <Form
                                                        name="basic"
                                                        layout="vertical"
                                                        size="large"
                                                        autoComplete="off"
                                                    >

                                                        <CustomRow >
                                                            <CustomCol xl={12}>
                                                                <Form.Item name="test" initialValue={false}>
                                                                    <ConfigurationSwitch title="Toggle between Text/Semantic Search" />
                                                                </Form.Item>
                                                            </CustomCol>

                                                            <CustomCol xl={12}>
                                                                <Form.Item name="test2" initialValue={false}>
                                                                    <ConfigurationSwitch title="Toggle between Department/Relevance based Search" />
                                                                </Form.Item>
                                                            </CustomCol>
                                                        </CustomRow>

                                                        <CustomRow>
                                                            <CustomCol xl={12}>
                                                                <Form.Item name="test3" initialValue={false}>
                                                                    <ConfigurationSwitch title="Voice based Search" />
                                                                </Form.Item>
                                                            </CustomCol>
                                                            <CustomCol xl={12}>
                                                                <Form.Item name="test6" initialValue={false}>
                                                                    <ConfigurationSwitch title="User Rating" />
                                                                </Form.Item>
                                                            </CustomCol>

                                                        </CustomRow>

                                                        <CustomRow>

                                                            <CustomCol xl={12}>
                                                                <Form.Item name="test4" initialValue={false}>
                                                                    <ConfigurationSwitch title="Preview for documents" />
                                                                </Form.Item>
                                                            </CustomCol>

                                                            <CustomCol xl={12}>
                                                                <Form.Item
                                                                    name="test5"
                                                                    initialValue={false}
                                                                >
                                                                    <ConfigurationSwitch title="Sorting" onValueChange={(val) => { setPersonalize_isSorting(val) }} />
                                                                </Form.Item>
                                                                {personalize_isSorting &&
                                                                    <Form.Item name="sortingfields">
                                                                        <Select
                                                                            showSearch
                                                                            placeholder="Select a Sorting Fields"
                                                                            optionFilterProp="children"
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option key={"op1"} value={"Modified Date"}>Modified Date</Option>
                                                                            <Option key={"op2"} value={"Size"}>Size</Option>
                                                                            <Option key={"op3"} value={"Name"}>Name</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                }
                                                            </CustomCol>
                                                        </CustomRow>

                                                        <CustomRow>
                                                            <CustomCol xl={24}>
                                                                <Divider dashed className="m-b-20" />
                                                            </CustomCol>
                                                        </CustomRow>

                                                        <CustomRow key="rw3">
                                                            <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                                                <Space direction="horizontal">
                                                                    <Button type="primary">
                                                                        Apply
                                                                    </Button>
                                                                    <Button type="primary">
                                                                        Apply For All
                                                                    </Button>
                                                                    <Button type="primary">
                                                                        Preview
                                                                    </Button>
                                                                </Space>
                                                            </CustomCol>
                                                        </CustomRow>
                                                    </Form>
                                                </StyledCard>
                                            </CustomCol>
                                        </CustomRow>
                                    </TabPane>

                                    <TabPane tab="Categorize Search" key="2">
                                        <CustomRow justify="center">
                                            <CustomCol xl={12} >
                                                <StyledCard className="inner-card">
                                                    <Form
                                                        name="basic"
                                                        layout="vertical"
                                                        size="large"
                                                        autoComplete="off"
                                                    >
                                                        <CustomRow>
                                                            <CustomCol xl={24}>
                                                                <Form.Item name="test5" initialValue={false}>
                                                                    <ConfigurationSwitch title="Facets" onValueChange={(val) => { setCategorize_isFacets(val) }} />
                                                                </Form.Item>
                                                                {categorize_isFacets &&
                                                                    <Form.Item name="sortingfields">
                                                                        <Select
                                                                            showSearch
                                                                            optionFilterProp="children"
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                            mode="tags"
                                                                            placeholder="Tags Select your facets">
                                                                            <Option key={"source"} value={"Source"}>Source</Option>
                                                                            <Option key={"department"} value={"Department"}>Department</Option>
                                                                            <Option key={"author"} value={"Author"}>Author</Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                }
                                                            </CustomCol>

                                                            <CustomCol xl={24}>
                                                                <Form.Item name="test5" initialValue={false}>
                                                                    <ConfigurationSwitch title="Advanced Search" />
                                                                </Form.Item>
                                                            </CustomCol>

                                                            <CustomCol xl={24}>
                                                                <Form.Item name="test5" label="Pagination" initialValue={false}>
                                                                    <InputNumber placeholder="Entries Per Page" value={50} defaultValue={50} />
                                                                </Form.Item>
                                                            </CustomCol>

                                                        </CustomRow>
                                                        <CustomRow key="rw3">
                                                            <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                                                <Space direction="horizontal">
                                                                    <Button type="primary">Apply</Button>
                                                                    <Button type="primary">Apply For All</Button>
                                                                    <Button type="primary">Preview</Button>
                                                                </Space>
                                                            </CustomCol>
                                                        </CustomRow>
                                                    </Form>
                                                </StyledCard>
                                            </CustomCol>
                                        </CustomRow>
                                    </TabPane>

                                    <TabPane tab="Optimize Search" key="3">
                                        Optimize Search
                                    </TabPane>
                                </Tabs>
                            </CustomCol>
                        </CustomRow>
                    </div>

                    <CustomRow>
                        <CustomCol xxl={24} xl={24} >
                            <div className="steps-action text-right">
                                {current > 0 && (
                                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                        Previous
                                    </Button>
                                )}
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => next()}>
                                        Save & Next
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" >
                                        Done
                                    </Button>
                                )}
                            </div>
                        </CustomCol>
                    </CustomRow>

                </StyledCard>
            </CustomCol>
        </CustomRow >
    );
}

export default QuickSetup;
