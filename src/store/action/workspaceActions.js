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
        debugger;
        const response = await Api.post("/jobs/create", payload);
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

const GetWorkspaceSourceDetailApi = async (payload) => {
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

export function GetWorkspaceSourceDetail(payload) {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const response = await GetWorkspaceSourceDetailApi({
                workspace_name: payload,
                username: state.auth.UserDetail.userName
            });
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
            debugger;
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



