import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Checkbox, Divider, Dropdown, Empty, Form, Input, InputNumber, Menu, PageHeader, Popover, Progress, Radio, Select, Space, Steps, Table, Tabs, Tag, Tooltip, Tree, Typography } from "antd";
import CustomRow from "../../components/CustomRow";
import CustomCol from "../../components/CustomCol";
import { FiSliders } from "react-icons/fi";
import { StyledCard } from "../../styled-components/CommonControls";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "../../hooks/useMessage";
import { HomeOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'

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
import { useLocation } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import clsWorkspace from "../../model/workspaceDetail";
import { sourceApi as Api } from "../../utility/axios";
import { CONFLUENCE } from "../../model/constant"

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
        title: 'User Management',
        isOptional: true
    },
    {
        key: 'step-7',
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
    const CurrentUser = useSelector(state => state.auth.UserDetail);

    //Workspace Details Variables Start
    const [WorkspaceDetails, setWorkspaceDetails] = useState(new clsWorkspace());
    const [currentWorkspaceSources, setCurrentWorkspaceSources] = useState([]);
    const [currentWorkspaceIngestionSetting, setcurrentWorkspaceIngestionSetting] = useState(null);
    const [currentWorkSpaceSelectedConfigTemplate, setCurrentWorkSpaceSelectedConfigTemplate] = useState([]);

    const CurrentWorkSpaceWorkspace = useSelector(state => state.workspace.SelectedWorkspace);
    const [isChanged, setIsChanged] = useState(false);

    //Workspace Details Variables End

    const dispatch = useDispatch();
    const RouteMatch = useRouteMatch();
    const history = useHistory();
    const [isEditMode, setIsEditMode] = useState(false);

    const UserDetail = useSelector(state => state.auth.UserDetail);

    const [entities, setEntities] = useState(entitiesMock);
    const [selectedWorkspaceSources, setSelectedWorkspaceSources] = useState([]);

    const [personalize_isSorting, setPersonalize_isSorting] = useState(false);
    const [categorize_isFacets, setCategorize_isFacets] = useState(false);

    const [current, setCurrent] = useState(0);
    const [SourceList, setSourceList] = useState([]);
    const [JobList, setJobList] = useState([]);
    const [UserList, setUserList] = useState([]);

    const [maxValidateStep, setMaxValidateStep] = useState(0)
    const [newStep, setNewStep] = useState(0);
    const [stepLoading, setStepLoading] = useState(false);

    const {
        ShowSuccessMessage,
        ShowErrorMessage,
        ShowWarningMessage,
    } = useMessage();
    const { ShowConfirmDailog } = useConfirm();
    const location = useLocation();

    const sourceListMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => {
                history.push({
                    pathname: `${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`,
                    search: `?isFromQuickLinks=true&isEditMode=${isEditMode}`
                });
            }} >{CONFLUENCE}</Menu.Item>
            <Menu.Item key="2" onClick={() => {
                history.push({
                    pathname: `${RouteMatch.path}/${RouteUrl.SHAREPOINT}/${RouteUrl.CREATESOURCE}`,
                });
            }}>
                Sourcepoint Online
            </Menu.Item>
            <Menu.Item key="3" >
                3rd menu item
            </Menu.Item>
        </Menu>
    );

    //#region Screen-1-Workspace
    const [WorkspaceForm] = Form.useForm();

    useEffect(() => {
        const getWorkspacedata = async () => {
            const WorkSpaceDetail = await dispatch(ActionCreator.GetWorkspaceDetail(CurrentWorkSpaceWorkspace));
            if (WorkSpaceDetail.data) {
                setWorkspaceDetails({
                    id: WorkSpaceDetail.data.id,
                    workspace_name: WorkSpaceDetail.data.workspace_name,
                    description: WorkSpaceDetail.data.description,
                    set_default: WorkSpaceDetail.data.set_default
                });

                WorkspaceForm.setFieldsValue({
                    workspacename: WorkSpaceDetail.data.workspace_name,
                    description: WorkSpaceDetail.data.description,
                    isDefault: WorkSpaceDetail.data.set_default
                });
                setMaxValidateStep(1);
                setIsEditMode(true);

                const params = new URLSearchParams(location.search);
                if (params.has("step")) {
                    setNewStep(params.get("step") - 1);
                }
            }
        }
        if (CurrentWorkSpaceWorkspace) {
            getWorkspacedata();
        }
        else {
            WorkspaceForm.resetFields()
        }
    }, [dispatch, CurrentWorkSpaceWorkspace])

    const SaveWorkSpaceDetail = async () => {
        try {
            let formValues = null;
            try {
                formValues = await WorkspaceForm.validateFields();
            } catch (error) {
                return;
            }

            if (isEditMode) {
                await dispatch(
                    ActionCreator.UpdateWorkSpaceDetail({
                        workspace_name: formValues.workspacename,
                        username: UserDetail.userName,
                        description: formValues.description,
                        set_default: formValues.isDefault
                    }));

                setWorkspaceDetails({
                    ...WorkspaceDetails,
                    workspace_name: formValues.workspacename,
                    description: formValues.description,
                    set_default: formValues.isDefault
                });
            }
            else {

                const result = await dispatch(
                    ActionCreator.CreateWorkSpace({
                        workspace_name: formValues.workspacename,
                        username: UserDetail.userName,
                        description: formValues.description,
                        set_default: formValues.isDefault ? true : false
                    }));

                setIsEditMode(true);
                setWorkspaceDetails({
                    description: formValues.description,
                    workspace_name: formValues.workspacename,
                    set_default: formValues.isDefault ? true : false,
                    id: result.data.id
                });
            }
        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }
    //#endregion

    //#region Screen-2-Source

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
                    workspace_name: WorkspaceDetails.workspace_name,
                    selected: selectedWorkspaceSources
                }));
            setCurrentWorkspaceSources(selectedWorkspaceSources);

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const SaveConfigTemplateToWorkSpace = async () => {
        try {
            const result = await dispatch(
                ActionCreator.SaveConfigTemplateToWorkSpace({
                    workspace_name: WorkspaceDetails.workspace_name,
                    selected: entities.columns["done"].data.map(data => data.config_id)
                }));

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const getWorkSpaceSourceData = async () => {
        if (SourceList.length <= 0) {
            const response = await dispatch(ActionCreator.GetWorkSpaceSourceList({
                workspace_name: WorkspaceDetails.workspace_name,
                username: CurrentUser.userName
            }))
            setSourceList(response);


        }
    }

    //#endregion

    //#region Screen-3-Config Template

    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [draggingTaskId, setDraggingTaskId] = useState(null);

    const tableColumns = [
        {
            title: 'Config Name',
            dataIndex: 'config_name',
            key: 'config_name',
        },
        {
            title: 'Source Type',
            dataIndex: 'source_type',
            key: 'source_type',
        },

        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <CustomPopover
        //             placement="bottom"
        //             title={<span>Tree</span>}
        //             content={<Tree
        //                 treeData={text.selected_item_tree}
        //                 autoExpandParent={true}
        //                 expandedKeys={text.parent_items}
        //                 fieldNames={{
        //                     title: "title", key: "id", children: "children"
        //                 }}
        //             />} trigger="click">
        //             <Button shape="circle" icon={<BiNetworkChart fontSize="25" />} />
        //         </CustomPopover>
        //     ),
        // },
    ];

    const GetConfigTemplateList = async () => {
        try {
            if (entities.columns["todo"].data.length <= 0) {
                const response = await dispatch(ActionCreator.GetWorkspaceSourceConfigList({
                    workspace_name: WorkspaceDetails.workspace_name,
                    source_ids: selectedWorkspaceSources
                }));
                const newList = { ...entitiesMock };
                newList.columns["todo"].data = response?.data.configs
                setEntities(newList);

            }
        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const GetSelectedConfigTemplateList = async () => {
        try {
            if (entities.columns["done"].data.length <= 0) {
                const response = await dispatch(ActionCreator.GetWorkspaceSelectedConfigTemplate({
                    workspace_name: WorkspaceDetails.workspace_name
                }));
                const newList = { ...entitiesMock };
                newList.columns["done"].data = response?.data.configs
                setEntities(newList);
                if (newList.columns["done"].data.length > 0 && maxValidateStep < 3) {
                    setMaxValidateStep(3);
                }
            }

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

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
            (selectedTaskId) => selectedTaskId.id === record.config_id
        );
        const isGhosting =
            isSelected && Boolean(draggingTaskId) && draggingTaskId.id !== record.config_id;

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
    const SaveIngestionSettings = async () => {

        try {
            let formValues = null;
            try {
                formValues = await IngestionSettingsForm.validateFields();
            } catch (error) {
                return;
            }
            await dispatch(
                ActionCreator.SaveIngestionSettingToWorkSpace({
                    workspace_name: WorkspaceDetails.workspace_name,
                    semantic_search: formValues.IngestionSetting_Semantic_Search ? true : false,
                    ML_model_vectorization: formValues.IngestionSetting_ML_Model,
                    ocr: formValues.IngestionSetting_Include_OCR ? true : false,
                    file_types: formValues.IngestionSetting_File_Types,
                    size_limit: formValues.IngestionSetting_File_size,
                    encrypted_doc: formValues.IngestionSetting_Include_Encrytpted_Documents ? true : false,
                    summarization: formValues.IngestionSetting_Include_Summarization ? true : false,
                    password_protection: formValues.IngestionSetting_Include_Password_Protected ? true : false
                }));

            setcurrentWorkspaceIngestionSetting({
                workspace_name: WorkspaceDetails.workspace_name,
                semantic_search: formValues.IngestionSetting_Semantic_Search,
                ML_model_vectorization: formValues.IngestionSetting_ML_Model,
                ocr: formValues.IngestionSetting_Include_OCR,
                file_types: formValues.IngestionSetting_File_Types,
                size_limit: formValues.IngestionSetting_File_size,
                encrypted_doc: formValues.IngestionSetting_Include_Encrytpted_Documents,
                summarization: formValues.IngestionSetting_Include_Summarization,
                password_protection: formValues.IngestionSetting_Include_Password_Protected
            });




        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }

        // const data = await form.validateFields();
    }
    //#endregion

    //#region Screen-5-JobDetails
    const JobDetailsColumns = [
        {
            title: 'Job Name',
            dataIndex: 'job_name',
            key: 'job_name',
        },
        {
            title: 'Config Name',
            dataIndex: 'config_name',
            key: 'config_name',
        },
        {
            title: 'Status',
            dataIndex: 'job_status',
            key: 'job_status',
            render: (text, record) => {
                if (text.toUpperCase() === "CREATED") {
                    return <Tag color="warning">Created</Tag>
                }
                return <Tag color="success">Started</Tag>
            }
        },
        {
            title: 'Document Count',
            dataIndex: 'document_count',
            key: 'document_count',
        },

        {
            title: 'Run By',
            dataIndex: 'user_name',
            key: 'user_name',
        },

        {
            title: 'Job Run Type',
            dataIndex: 'run_type',
            key: 'run_type',
        },

        {
            title: 'Job Run Type',
            dataIndex: 'run_type',
            key: 'run_type',
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
    const [WorkspaceJobForm] = Form.useForm();

    const SaveJobsToWorkspace = async (isRunJob = false) => {
        try {
            let formValues = null;
            try {
                formValues = await WorkspaceJobForm.validateFields();
            } catch (error) {
                return;
            }

            const result = await dispatch(
                ActionCreator.SaveJobToWorkSpace({
                    workspace_name: WorkspaceDetails.workspace_name,
                    config_name: formValues.JobConfigTemplate,
                    run_type: formValues.JobRuntype,
                    job_type: formValues.Jobtype,
                    status_job: isRunJob ? "run" : "create",
                    user_name: CurrentUser.userName
                }));

        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const getWorkSpaceJobData = async () => {
        if (JobList.length <= 0) {
            const response = await dispatch(ActionCreator.GetWorkspaceJobs(
                {
                    workspace_name: WorkspaceDetails.workspace_name,
                    user_name: CurrentUser.userName
                }
            ))
            setJobList(response.data);
        }
    }
    //#endregion

    //#region Screen-7-View Setting

    //#endregion

    //#region Screen-6-UserScreen
    const [searchWord, setSearchWord] = useState("");
    const [suggessionUserList, setSuggessionUserList] = useState([]);
    const [WorkspaceUserForm] = Form.useForm();

    const UserListColumns = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },

        {
            title: 'Admin Access',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text, record) => {
                if (text) {
                    return <Tag color="success">Yes</Tag>
                }
                return <Tag color="error">No</Tag>
            }
        },

        {
            title: 'Readonly Access',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text) => {
                if (!text) {
                    return <Tag color="success">Yes</Tag>
                }
                return <Tag color="error">No</Tag>
            }
        },


    ];

    useEffect(() => {
        let timer;
        try {
            timer = setTimeout(() => {
                getdata();
            }, 500);

            const getdata = async () => {
                if (searchWord) {
                    const result = await Api.post(`/workspace/search`, {
                        "search_str": searchWord,
                        "usernames": []
                    });
                    setSuggessionUserList(result.data.usernames);
                }
            };

            return () => {
                clearTimeout(timer);
            };
        } catch (error) {
            console.log(error);
        }
    }, [searchWord]);

    const SaveWorkSpaceUserDetail = async () => {
        try {

            let formValues = null;
            try {
                formValues = await WorkspaceUserForm.validateFields();
                const data = {
                    workspace_name: WorkspaceDetails.workspace_name,
                    admin: formValues.UserAccess === "AdminAccess" ? [formValues.WorkSpaceuser] : [],
                    read_only: formValues.UserAccess === "ReadOnlyAccess" ? [formValues.WorkSpaceuser] : []
                }

                await dispatch(ActionCreator.SaveUserToWorkSpace(data))

                console.log(formValues);
            } catch (error) {
                return;
            }

            // if (isEditMode) {
            //     await dispatch(
            //         ActionCreator.UpdateWorkSpaceDetail({
            //             workspace_name: formValues.workspacename,
            //             username: UserDetail.userName,
            //             description: formValues.description
            //         }));

            //     setWorkspaceDetails({
            //         ...WorkspaceDetails,
            //         workspace_name: formValues.workspacename,
            //         description: formValues.description
            //     });
            // }
            // else {
            //     const result = await dispatch(
            //         ActionCreator.CreateWorkSpace({
            //             workspace_name: formValues.workspacename,
            //             username: UserDetail.userName,
            //             description: formValues.description
            //         }));

            //     setIsEditMode(true);
            //     setWorkspaceDetails({
            //         description: formValues.description,
            //         workspace_name: formValues.workspacename,
            //         id: result.data.id
            //     });
            // }
        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const getWorkSpaceUsersData = async () => {
        if (UserList.length <= 0) {
            const response = await dispatch(ActionCreator.GetWorkspaceUser(
                {
                    workspace_name: WorkspaceDetails.workspace_name,
                }
            ))
            setUserList(response);
        }
    }
    //#endregion


    const ValidateStage = (newStep, currentStep) => {
        try {
            switch (newStep) {
                case 1:
                    if (WorkspaceDetails.id <= 0) {
                        ShowWarningMessage("Please add workspace details to continue!");
                        return false
                    }
                    return true
                case 2:
                    if (WorkspaceDetails.id <= 0) {
                        ShowWarningMessage("Please add workspace details to continue!");
                        return false
                    }

                    if (selectedWorkspaceSources.length <= 0) {
                        ShowWarningMessage("Please select source to continue!");
                        return false

                    }
                    return true

                default:
                    return true

            }
        } catch (error) {
        }
    }

    const DiscardChanges = (currentStep) => {
        switch (currentStep) {
            case 0:
                WorkspaceForm.setFieldsValue({
                    workspacename: WorkspaceDetails.workspace_name,
                    description: WorkspaceDetails.description,
                });
                break;
            case 1:
                setSelectedWorkspaceSources(currentWorkspaceSources)
                break;

            case 2:
                break;

            case 3:
                IngestionSettingsForm.setFieldsValue({
                    IngestionSetting_Semantic_Search: currentWorkspaceIngestionSetting.semantic_search,
                    IngestionSetting_ML_Model: currentWorkspaceIngestionSetting.ML_model_vectorization,
                    IngestionSetting_Include_OCR: currentWorkspaceIngestionSetting.ocr,
                    IngestionSetting_File_Types: currentWorkspaceIngestionSetting.file_types,
                    IngestionSetting_File_size: currentWorkspaceIngestionSetting.size_limit,
                    IngestionSetting_Include_Encrytpted_Documents: currentWorkspaceIngestionSetting.encrypted_doc,
                    IngestionSetting_Include_Summarization: currentWorkspaceIngestionSetting.summarization,
                    IngestionSetting_Include_Password_Protected: currentWorkspaceIngestionSetting.password_protection,
                })
                break;

            default:
                break;
        }
    }

    const getCurrentWorkspaceSelectedSources = async () => {
        try {
            if (currentWorkspaceSources.length <= 0) {
                const result = await dispatch(
                    ActionCreator.GetWorkSpaceSelectedSourceDetail({
                        workspace_name: WorkspaceDetails.workspace_name,
                        username: CurrentUser.userName
                    })
                );
                if (result) {
                    if (result) {
                        setMaxValidateStep(2);
                    }
                    setSelectedWorkspaceSources(result);
                    setCurrentWorkspaceSources(result);
                }
            }
        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    const getCurrentWorkspaceIngestionSetting = async () => {
        try {
            if (!currentWorkspaceIngestionSetting) {
                const result = await dispatch(
                    ActionCreator.GetWorkspaceIngestionDetail(WorkspaceDetails.workspace_name)
                );

                if (result) {
                    setcurrentWorkspaceIngestionSetting({
                        workspace_name: WorkspaceDetails.workspace_name,
                        semantic_search: result.ingestion_settigns.semantic_search,
                        ML_model_vectorization: result.ingestion_settigns.ML_model_vectorization,
                        ocr: result.ingestion_settigns.ocr,
                        file_types: result.ingestion_settigns.file_types,
                        size_limit: result.ingestion_settigns.size_limit,
                        encrypted_doc: result.ingestion_settigns.encrypted_doc,
                        summarization: result.ingestion_settigns.summarization,
                        password_protection: result.ingestion_settigns.password_protection
                    });

                    IngestionSettingsForm.setFieldsValue({
                        workspace_name: WorkspaceDetails.workspace_name,
                        IngestionSetting_Semantic_Search: result.ingestion_settigns.semantic_search,
                        IngestionSetting_ML_Model: result.ingestion_settigns.ML_model_vectorization,
                        IngestionSetting_Include_OCR: result.ingestion_settigns.ocr,
                        IngestionSetting_File_Types: result.ingestion_settigns.file_types,
                        IngestionSetting_File_size: result.ingestion_settigns.size_limit,
                        IngestionSetting_Include_Encrytpted_Documents: result.ingestion_settigns.encrypted_doc,
                        IngestionSetting_Include_Summarization: result.ingestion_settigns.summarization,
                        IngestionSetting_Include_Password_Protected: result.ingestion_settigns.password_protection
                    });
                    if (entities.columns["done"].data.length > 0 && maxValidateStep < 4) {
                        setMaxValidateStep(4);
                    }
                }
            }
        } catch (error) {
            ShowErrorMessage("Something Went Wrong");
        }
    }

    useEffect(() => {
        let isValidate = true;
        if (newStep > -1 && newStep <= maxValidateStep) {
            if (current < newStep) {
                isValidate = ValidateStage(newStep, current);

                if (isValidate) {
                    if (isChanged) {
                        ShowConfirmDailog("Discard Changes",
                            "Your changes will be discarded, are you sure you want to continue?",
                            () => {
                                DiscardChanges(current);
                                setIsChanged(false);
                                setCurrent(newStep)
                            },
                            () => {
                                setNewStep(-1)
                            },
                            "Yes",
                            "No")
                    }
                    else {
                        debugger;
                        setCurrent(newStep);
                        setNewStep(-1)
                    }
                }

            }
            else if (newStep > -1) {
                if (isChanged) {
                    ShowConfirmDailog("Discard Changes",
                        "Your changes will be discarded, are you sure you want to continue?",
                        () => {
                            DiscardChanges(current);
                            setIsChanged(false);
                            setCurrent(newStep)
                        },
                        () => {
                            setNewStep(-1)
                        },
                        "Yes",
                        "No")
                }
                else {
                    setCurrent(newStep);
                    setNewStep(-1);
                }
            }
        }
    }, [newStep, maxValidateStep])

    // useEffect(() => {
    //     if (WorkspaceDetails.id > 0 && newStep >= 1 && isChanged === false) {
    //         getWorkSpaceSourceData();
    //         getCurrentWorkspaceSelectedSources();
    //     }

    //     if (selectedWorkspaceSources.length > 0 && newStep >= 2 && isChanged === false) {
    //         GetConfigTemplateList();
    //         GetSelectedConfigTemplateList();
    //     }

    //     if (WorkspaceDetails.id > 0 && newStep >= 3 && isChanged === false) {
    //         getCurrentWorkspaceIngestionSetting();
    //     }
    // }, [selectedWorkspaceSources, newStep]);

    useEffect(() => {
        if (newStep >= 1 && maxValidateStep >= 1 && isChanged === false) {
            getWorkSpaceSourceData();
            getCurrentWorkspaceSelectedSources();
        }

        if (newStep >= 2 && maxValidateStep >= 2 && isChanged === false) {
            debugger;
            GetConfigTemplateList();
            GetSelectedConfigTemplateList();
        }

        if (newStep >= 3 && maxValidateStep >= 3 && isChanged === false) {
            getCurrentWorkspaceIngestionSetting();
        }

        if (newStep >= 4 && maxValidateStep >= 4 && isChanged === false) {
        }

        if (newStep >= 4 && maxValidateStep >= 4 && isChanged === false) {
        }

    }, [newStep, maxValidateStep]);


    const onChange = newStep => {
        setNewStep(newStep);
    };

    const next = () => {
        switch (current) {
            case 0:
                if (isChanged) {
                    SaveWorkSpaceDetail();
                }
                getWorkSpaceSourceData();
                getCurrentWorkspaceSelectedSources();
                break;

            case 1:
                try {
                    if (isChanged) {
                        SaveSourcesToWorkSpace();
                    }
                    GetConfigTemplateList();
                    GetSelectedConfigTemplateList();
                }
                catch (error) {
                    ShowErrorMessage("Something Went Wrong");
                }
                break;

            case 2:
                SaveConfigTemplateToWorkSpace();
                getCurrentWorkspaceIngestionSetting()
                setCurrent(current + 1);
                break;
            case 3:
                try {
                    const GetSelectedConfigTemplateList = async () => {
                        const response = await dispatch(ActionCreator.GetWorkspaceSelectedConfigTemplate({
                            workspace_name: WorkspaceDetails.workspace_name
                        }));
                        setCurrentWorkSpaceSelectedConfigTemplate(response.data.configs)
                    }
                    SaveIngestionSettings();
                    GetSelectedConfigTemplateList();
                    getWorkSpaceJobData();
                    setCurrent(current + 1);
                }
                catch (error) {
                    ShowErrorMessage("Something Went Wrong");
                }
                break;

            case 4:
                getWorkSpaceUsersData();
                setCurrent(current + 1);
                break;

            default:
                break;
        }
        setNewStep(current + 1);
        setIsChanged(false);
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
                    <Steps className="quick_setup_form" current={current} size="small" onChange={onChange}>
                        {steps.map(step => {
                            return <Step key={step.key} title={step.title} description={step.isOptional && "(Optional)"} />
                        })}
                    </Steps>
                    <div className={`quick_setup_form_content ${current === 0 && "active"}`}>
                        <Form
                            name="WorkspaceDetailForm" layout="vertical"
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
                                        ]}>
                                        <Input
                                            placeholder="Enter Workspace Name"
                                            disabled={isEditMode}
                                            onChange={() => {
                                                setIsChanged(true)
                                            }} />
                                    </Form.Item>
                                </CustomCol>
                            </CustomRow>

                            <CustomRow key="rw2">
                                <CustomCol key="rw2.1" xl={24} >
                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        onChange={() => {
                                            setIsChanged(true)
                                        }}
                                    >
                                        <TextArea rows={4} placeholder="Enter Description" />
                                    </Form.Item>
                                </CustomCol>
                            </CustomRow>

                            <CustomRow key="rw3">
                                <CustomCol key="rw2.2" xl={24} >
                                    <Form.Item name="isDefault" valuePropName="checked" initialValue={false} >
                                        <Checkbox value={false} onChange={() => { setIsChanged(true) }}>Set As Default WorkSpace</Checkbox>
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
                                            setIsChanged(true);
                                            setSelectedWorkspaceSources(selectedRowKeys);
                                        },
                                        selectedRowKeys: selectedWorkspaceSources
                                    }}
                                />
                            </CustomCol>
                        </CustomRow>
                        <CustomRow>
                            <CustomCol className="text-right">
                                <Dropdown overlay={sourceListMenu}>
                                    <Button className="m-t-10">
                                        Create Source <DownOutlined />
                                    </Button>
                                </Dropdown>
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
                                            rowKey="config_id"
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
                                            rowKey="config_id"
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
                                    form={IngestionSettingsForm}
                                    layout="vertical"
                                    name="IngestionForm"
                                    autoComplete="off"
                                    size="large"
                                >
                                    <CustomRow>
                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Semantic_Search"
                                            >
                                                <ConfigurationSwitch
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    title="Include Semantic Search" />
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Include_OCR"
                                                initialValue={false}>
                                                <ConfigurationSwitch
                                                    value={false}
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    title="Include OCR" />
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={8}>
                                            <Form.Item name="IngestionSetting_Include_Encrytpted_Documents"
                                                initialValue={false}>
                                                <ConfigurationSwitch
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    title="Include encrytpted documents" />
                                            </Form.Item>
                                        </CustomCol>
                                    </CustomRow>

                                    <CustomRow>
                                        <CustomCol xl={8}>
                                            <Form.Item
                                                name="IngestionSetting_Include_Password_Protected"
                                                initialValue={false}

                                            >
                                                <ConfigurationSwitch
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    title="Include password protected documents" />
                                            </Form.Item>
                                        </CustomCol>
                                        <CustomCol xl={8}>
                                            <Form.Item
                                                name="IngestionSetting_Include_Summarization"
                                                initialValue={false}
                                            >
                                                <ConfigurationSwitch
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    title="Include Summarization Toggle" />
                                            </Form.Item>
                                        </CustomCol>


                                    </CustomRow>

                                    <CustomRow>
                                        <CustomCol xl={8}>
                                            <Form.Item
                                                name="IngestionSetting_ML_Model"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select ml model!',
                                                    },
                                                ]}
                                                label="Choose ML Model for vectorization" >
                                                <Select
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    showSearch
                                                    placeholder="Select a ML Model"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }>
                                                    <Option key={"op1"} value={"msmarco-roberta-base-v3"}>msmarco-roberta-base-v3</Option>
                                                    <Option key={"op2"} value={"bert-large-nli-stsb-mean-tokens"}>bert-large-nli-stsb-mean-tokens</Option>
                                                </Select>
                                            </Form.Item>

                                        </CustomCol>

                                        <CustomCol xl={10}>
                                            <Form.Item name="IngestionSetting_File_Types"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select file type!',
                                                    },
                                                ]}
                                                label="Include File types">
                                                <Select
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    mode="multiple" allowClear placeholder="Please select">
                                                    <Option key={"op1"} value={".docx"}>.docx</Option>
                                                    <Option key={"op2"} value={".pdf"}>.pdf</Option>
                                                    <Option key={"op3"} value={".pptx"}>.pptx</Option>
                                                    <Option key={"op4"} value={".ppt"}>.ppt</Option>
                                                    <Option key={"op5"} value={".txt"}>.txt</Option>
                                                    <Option key={"op6"} value={".csv"}>.csv</Option>
                                                </Select>
                                            </Form.Item>
                                        </CustomCol>

                                        <CustomCol xl={6}>
                                            <Form.Item
                                                required
                                                name="IngestionSetting_File_size"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please add file size!',
                                                    },
                                                ]}
                                                label="Limit the size of documents">
                                                <InputNumber
                                                    onChange={() => {
                                                        setIsChanged(true);
                                                    }}
                                                    placeholder="Size"
                                                />
                                            </Form.Item>
                                        </CustomCol>
                                    </CustomRow>
                                </Form>
                            </CustomCol>
                        </CustomRow>
                    </div>
                    <div className={`quick_setup_form_content ${current === 4 && "active"}`}>
                        <CustomRow>

                            <CustomCol xl={24}>
                                <StyledCard title="Add New Job" className="inner-card">
                                    <Form
                                        name="JobForm"
                                        layout="vertical"
                                        size="large"
                                        autoComplete="off"
                                        form={WorkspaceJobForm}
                                    >
                                        <CustomRow key="rw2">
                                            <CustomCol key="rw2.1" xl={8}>
                                                <Form.Item
                                                    name="JobConfigTemplate"
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
                                                        {currentWorkSpaceSelectedConfigTemplate.map(item => {
                                                            return <Option key={`JobConfig-${item.config_id}`} value={item.config_name}>{item.config_name}</Option>
                                                        })}

                                                    </Select>
                                                </Form.Item>
                                            </CustomCol>

                                            <CustomCol key="rw2.3" xl={8}>
                                                <Form.Item
                                                    name="JobRuntype"
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

                                            <CustomCol key="rw2.4" xl={8}>
                                                <Form.Item
                                                    name="Jobtype"
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
                                                    <Button type="primary" onClick={() => SaveJobsToWorkspace(true)}>
                                                        Create And Run
                                                    </Button>
                                                    <Button type="primary" htmlType="submit" onClick={() => SaveJobsToWorkspace(false)}>
                                                        Create
                                                    </Button>
                                                </Space>
                                            </CustomCol>
                                        </CustomRow>
                                    </Form>
                                </StyledCard>
                            </CustomCol>

                            <CustomCol xl={24}>
                                <StyledCard title="Job List" className="inner-card">
                                    <Table dataSource={JobList} columns={JobDetailsColumns} bordered pagination={false} />
                                </StyledCard>
                            </CustomCol>
                        </CustomRow>
                    </div>
                    <div className={`quick_setup_form_content ${current === 5 && "active"}`}>

                        <CustomRow>

                            <CustomCol xl={24}>
                                <StyledCard title="Add New Job" className="inner-card">
                                    <Form
                                        form={WorkspaceUserForm}
                                        layout="vertical"
                                        name="WorkspaceUserForm"
                                        autoComplete="off"
                                        size="large"
                                    >
                                        <CustomRow key="rw2">
                                            <CustomCol key="rw2.1" xl={8}>
                                                <Form.Item label="Select User" name="WorkSpaceuser" rules={[
                                                    {
                                                        required: true,
                                                        message: "Please select correct user!",
                                                    },
                                                ]}>
                                                    <SearchUserItem title="Search and Select User" />
                                                </Form.Item>

                                                <Form.Item name="UserAccess" noStyle>
                                                    <Radio.Group value={"ReadOnlyAccess"}>
                                                        <Radio value={"AdminAccess"}>Admin Access</Radio>
                                                        <Radio value={"ReadOnlyAccess"} checked>Readonly Access</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </CustomCol>


                                        </CustomRow>

                                        <CustomRow key="rw3">
                                            <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                                <Space direction="horizontal">
                                                    <Button type="primary" onClick={() => SaveWorkSpaceUserDetail()}>
                                                        Add
                                                    </Button>
                                                </Space>
                                            </CustomCol>
                                        </CustomRow>
                                    </Form>
                                </StyledCard>
                            </CustomCol>

                            <CustomCol xl={24}>
                                <StyledCard title="Job List" className="inner-card">
                                    <Table dataSource={UserList} columns={UserListColumns} bordered pagination={false} />
                                </StyledCard>
                            </CustomCol>
                        </CustomRow>


                    </div>
                    <div className={`quick_setup_form_content ${current === 6 && "active"}`}>
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
                                                                    {/* <Button type="primary">
                                                                        Apply
                                                                    </Button> */}
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
                                                                    {/* <Button type="primary">Apply</Button> */}
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

const SearchUserItem = props => {
    const [searchWord, setSearchWord] = useState("");
    const [suggessionUserList, setSuggessionUserList] = useState([]);
    const [selectedVal, setselectedVal] = useState("")
    const [isVisible, setisVisible] = useState(false)

    const change = (selected_val) => {
        setisVisible(false);
        setselectedVal(selected_val);
        props.onChange(selected_val);
        if (props.onValueChange) {
            props.onValueChange(selected_val);
        }
    };

    useEffect(() => {
        let timer;
        try {
            timer = setTimeout(() => {
                getdata();
            }, 500);

            const getdata = async () => {
                if (searchWord) {
                    const result = await Api.post(`/workspace/search`, {
                        "search_str": searchWord,
                        "usernames": []
                    });
                    setSuggessionUserList(result.data.usernames);
                }
            };

            return () => {
                clearTimeout(timer);
            };
        } catch (error) {
            console.log(error);
        }
    }, [searchWord]);

    return <div className="QuickSetup_UserSuggestion" >
        <Input value={selectedVal.length <= 0 ? searchWord : selectedVal}
            placeholder={props.title}
            onKeyDown={() => {
                if (selectedVal.length > 0) {
                    setselectedVal("");
                    setSearchWord("");
                }
            }}
            onChange={(event) => {
                setselectedVal("");
                change("");
                setisVisible(true);
                setSearchWord(event.target.value)
            }} />
        {isVisible &&
            <StyledCard className="QuickSetup_UserSuggestion_ListContainer">
                {suggessionUserList.map(item => {
                    return <div onClick={() => change(item)} className="QuickSetup_UserSuggestion_ListItem">
                        <Text style={{ flex: "1" }}>{item}</Text>
                    </div>
                }
                )}
                {suggessionUserList.length <= 0 &&
                    <Text style={{ flex: "1" }}>No Data Found</Text>

                }
            </StyledCard>}
    </div>
}



