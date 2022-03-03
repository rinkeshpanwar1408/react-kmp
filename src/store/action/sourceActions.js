
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";
import { createSource } from "./actions";

//Api
const CreateSourceApi = async (payload) => {
  try {
    const response = await Api.post("/source/create", payload);
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
}

const UpdateSourceApi = async (payload) => {
  try {
    const response = await Api.put("/source/update", payload);
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
}

const GetSourcesApi = async (payload) => {
  try {
    const response = await Api.post('/source/all',{"userName": payload.username});
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
};

const GetSourceDetailApi = async (fullSourceName) => {
  try {
    const response = await Api.get(`/source/details/${fullSourceName}`);
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
      debugger;
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

export function UpdateSource(payload) {
  return async function (dispatch) {
    try {
      debugger;
      const response = await UpdateSourceApi(payload);
      debugger;
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
  return async function (dispatch,getState) {
    try {
      const state = getState();
      const response = await GetSourcesApi({username:state.auth.UserDetail.userName});
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

export function GetSourceDetail(payload) {
  return async function (dispatch) {
    try {
      const response = await GetSourceDetailApi(payload);
      if (response?.data) {
        return response;
      }
    } catch (error) {
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}
