import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";


//Apis
const CreateWorkSpaceApi = async (payload) => {
    try {
        debugger;
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

//Actions
export function CreateWorkSpace(payload) {
    return async function (dispatch) {
        try {
            const response = await CreateWorkSpaceApi(payload);
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