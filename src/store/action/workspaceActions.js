import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";


//Apis
const CreateWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/workspace/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const UpdateWorkSpaceDetailApi = async (payload) => {
    try {
        const response = await Api.put("/workspace/update", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}


const GetWorkspacesApi = async (payload) => {
    try {
        const response = await Api.post('/workspace/all', { "username": payload.username });
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const SaveSourcesToWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/workspace/source/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}


const SaveJobToWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/jobs/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}


const SaveUserToWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/workspace/add/users", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const SaveConfigToWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/workspace/config/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const SaveIngestionSettingToWorkSpaceApi = async (payload) => {
    try {
        const response = await Api.post("/workspace/ingestion/settings", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const GetWorkspaceDetailApi = async (workspace_name) => {
    try {
        const response = await Api.get(`/workspace/details/${workspace_name}`);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetWorkSpaceSelectedSourceDetailApi = async (payload) => {
    try {
        const response = await Api.post(`/workspace/sources`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};


const GetWorkSpaceSourceListApi = async (payload) => {
    try {
        const response = await Api.post(`/workspace/sources`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetWorkspaceIngestionApi = async (payload) => {
    try {
        const response = await Api.post(`/workspace/ingestion/status`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};


const GetWorkspaceSourceConfigListApi = async (payload) => {
    try {
        const response = await Api.post(
            '/workspace/source/config',
            { "workspace_name": payload.workspace_name, "source_ids": payload.source_ids }
        );
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};


const GetWorkspaceSelectedConfigTemplateApi = async (payload) => {
    try {
        const response = await Api.post(
            '/workspace/configs',
            { "workspace_name": payload.workspace_name }
        );
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetWorkspaceUserDetailApi = async (payload) => {
    try {
        const response = await Api.post(`/workspace/view/users`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetWorkspaceJobsApi = async (payload) => {
    try {
        const response = await Api.post(`/jobs/all`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetWorkspaceUsersApi = async (payload) => {
    try {
        const response = await Api.post(`/workspace/view/users`, payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

//Actions
export function CreateWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await CreateWorkSpaceApi(payload);
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function UpdateWorkSpaceDetail(payload) {
    return async function (dispatch) {
        try {
            const response = await UpdateWorkSpaceDetailApi(payload);
            if (response.data) {
                // dispatch({
                //     type: Actions.CREATEWORKSPACE,
                //     payload: payload
                // });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function ChangeWorkSpace(payload) {
    return function (dispatch) {
        try {
            dispatch({
                type: Actions.CHANGEWORKSPACE,
                payload: payload
            });
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaces() {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const response = await GetWorkspacesApi({ username: state.auth.UserDetail.userName });
            if (response?.data) {
                dispatch({
                    type: Actions.GETWORKSPACES,
                    payload: response?.data.workspaces_all
                })
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function SaveSourcesToWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await SaveSourcesToWorkSpaceApi(payload);
            if (response.data) {
                // dispatch({
                //     type: Actions.CREATEWORKSPACE,
                //     payload: payload
                // });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function SaveConfigTemplateToWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await SaveConfigToWorkSpaceApi(payload);
            if (response.data) {
                // dispatch({
                //     type: Actions.CREATEWORKSPACE,
                //     payload: payload
                // });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function SaveIngestionSettingToWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await SaveIngestionSettingToWorkSpaceApi(payload);
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function SaveJobToWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await SaveJobToWorkSpaceApi(payload);
            if (response.data) {
                // dispatch({
                //     type: Actions.CREATEWORKSPACE,
                //     payload: payload
                // });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function SaveUserToWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await SaveUserToWorkSpaceApi(payload);
            if (response.data) {
                // dispatch({
                //     type: Actions.CREATEWORKSPACE,
                //     payload: payload
                // });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceDetail(payload) {
    return async function (dispatch) {
        try {
            const WorkSpaceDetail = await GetWorkspaceDetailApi(payload);
            if (WorkSpaceDetail?.data) {
                return WorkSpaceDetail;
            }
            return null;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkSpaceSelectedSourceDetail(payload) {
    return async function (dispatch, getState) {
        try {
            const response = await GetWorkSpaceSelectedSourceDetailApi(payload);
            if (response?.data) {
                return response.data.selected_source_ids;
            }
            else {
                return null;
            }
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkSpaceSourceList(payload) {
    return async function (dispatch, getState) {
        try {
            const response = await GetWorkSpaceSourceListApi(payload);
            if (response?.data) {
                return response.data.source_list;
            }
            else {
                return null;
            }
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}
export function GetWorkspaceSourceConfigList(payload) {
    return async function (dispatch, getState) {
        try {
            const response = await GetWorkspaceSourceConfigListApi({
                workspace_name: payload.workspace_name,
                source_ids: payload.source_ids
            });

            if (response?.data) {
                dispatch({
                    type: Actions.GETSOURCECONFIGS,
                    payload: response.data
                })
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceSelectedConfigTemplate(payload) {
    return async function (dispatch, getState) {
        try {
            const response = await GetWorkspaceSelectedConfigTemplateApi({
                workspace_name: payload.workspace_name,
            });

            if (response?.data) {
                dispatch({
                    type: Actions.GETSOURCECONFIGS,
                    payload: response.data
                })
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceIngestionDetail(payload) {
    return async function (dispatch, getState) {
        try {
            const response = await GetWorkspaceIngestionApi({
                workspace_name: payload,
            });
            if (response?.data) {
                return response.data;
            }
            else {
                return null;
            }
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceUserDetail(payload) {
    return async function (dispatch) {
        try {
            const WorkSpaceDetail = await GetWorkspaceUserDetailApi(payload);
            if (WorkSpaceDetail?.data) {
                return WorkSpaceDetail;
            }
            return null;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceJobs(payload) {
    return async function (dispatch, getState) {
        try {
            const WorkSpaceJobsDetail = await GetWorkspaceJobsApi(payload);
            if (WorkSpaceJobsDetail?.data) {
                return WorkSpaceJobsDetail;
            }
            return null;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetWorkspaceUser(payload) {
    return async function (dispatch, getState) {
        try {
            const WorkSpaceusersDetail = await GetWorkspaceUsersApi(payload);
            if (WorkSpaceusersDetail?.data) {
                return WorkSpaceusersDetail.data.users;
            }
            return null;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}