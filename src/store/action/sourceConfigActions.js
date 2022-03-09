
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";
import { createSource } from "./actions";

//Api

const CreateSourceConfigApi = async (payload) => {
    try {
        debugger;
        const response = await Api.post("/source/config/create", payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const GetSourceConfigList_Api = async (payload) => {
    try {
        const response = await Api.post('/source/config/all', { "userName": payload.username });
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
};


//Source Actions
export function CreateSourceConfig(payload) {
    return async function (dispatch) {
        debugger;
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


export function GetSourceConfigList() {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const response = await GetSourceConfigList_Api({ username: state.auth.UserDetail.userName });
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
