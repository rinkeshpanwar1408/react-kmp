
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";
import { createSource } from "./actions";

//Api

const CreateSourceConfigApi = async (payload) => {
    try {
        const response = await Api(payload);
        return response;
    } catch (error) {
        let errorInfo;
        errorInfo = error.message;
        throw errorInfo;
    }
}

const GetSourceConfigList_Api = async () => {
    try {
        const response = await Api.get('/source/config/all');
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
        try {
            const response = await CreateSourceConfigApi(payload);
            if (response.data) {
                dispatch(createSource(payload));
            }
            return response;
        } catch (error) {
            dispatch({ type: Actions.SETERROR, payload: error });
            throw (error);
        }
    };
}


export function GetSourceConfigList() {
    return async function (dispatch) {
        try {
            const response = await GetSourceConfigList_Api();
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
