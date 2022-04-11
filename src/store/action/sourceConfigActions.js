
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";
import { createSource } from "./actions";

//Api

const CreateSourceConfigApi = async (payload) => {
    try {
        const response = await Api.post("/source/config/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const UpdateSourceConfigApi = async (payload) => {
    try {
        const response = await Api.put("/source/config/update", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const GetSourceConfigList_Api = async (payload) => {
    try {
        const response = await Api.post(
            '/source/config/all',
            { "userName": payload.username, "source_ids": payload.source_ids }
        );
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};

const GetSourceConfigDetailApi = async (fullSourceConfigName) => {
    try {
        const response = await Api.get(`/source/config/details/${fullSourceConfigName}`);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};


const DeleteSourceConfigApi = async (payload) => {
    try {
        const response = await Api.delete("/source/config/del", {
            data: { "full_config_name": payload }
        });
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}


//Source Actions
export function CreateSourceConfig(payload) {
    return async function (dispatch) {
        try {
            const response = await CreateSourceConfigApi(payload);
            if (response.data) {
                dispatch({
                    type: Actions.CREATESOURCECONFIG,
                    payload: payload
                });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function UpdateSourceConfig(payload) {
    return async function (dispatch) {
        debugger;
        try {
            const response = await UpdateSourceConfigApi(payload);
            if (response.data) {
                dispatch({
                    type: Actions.UPDATESOURCECONFIG,
                    payload: payload
                });
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function DeleteSourceConfig(payload) {
    return async function (dispatch) {
        try {
            debugger;
            const response = await DeleteSourceConfigApi(payload);
            if (response.data) {
                dispatch({
                    type: Actions.DELETESOURCECONFIG,
                    payload: payload
                })
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}

export function GetSourceConfigList(source_ids = []) {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const response = await GetSourceConfigList_Api({ username: state.auth.UserDetail.userName, source_ids });
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

export function GetSourceConfigDetail(payload) {
    return async function (dispatch) {
        try {
            const response = await GetSourceConfigDetailApi(payload);
            if (response?.data) {
                return response;
            }
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}
