
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";
import { createSource } from "./actions";

//Api

const CreateSourceApi = async (payload) => {
  try {
    const response = await Api(payload);
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
}

const GetSourcesApi = async () => {
  try {
    const response = await Api.get('/source/all');
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
};


//Source Actions
export function CreateSource(payload) {
  return async function (dispatch) {
    try {
      const response = await CreateSourceApi(payload);
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


export function GetSources() {
  return async function (dispatch) {
    try {
      const response = await GetSourcesApi();
      if (response?.data) {
        dispatch({
          type: Actions.GETSOURCES,
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
