
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";

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
    debugger;
    const response = await Api.put("/source/update", payload);
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
}

const DeleteSourceApi = async (payload) => {
  try {
    const response = await Api.delete("/source/del", {
      data: {
        "full_source_name": payload.full_source_name,
        "source_type": payload.source_type
      }
    });
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
}

const GetSourcesApi = async (payload) => {
  try {
    const response = await Api.post('/source/all', { "userName": payload.username });
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
      const response = await CreateSourceApi(payload);
      if (response.data) {
        dispatch({
          type: Actions.CREATESOURCE,
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

export function UpdateSource(payload) {
  return async function (dispatch) {
    try {
      debugger;
      const response = await UpdateSourceApi(payload);
      if (response.data) {
        //dispatch(createSource(payload));
      }
      return response;
    } catch (error) {
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}

export function DeleteSource(payload) {
  return async function (dispatch) {
    try {
      const response = await DeleteSourceApi(payload);
      debugger;
      if (response.data) {
        dispatch({
          type: Actions.DELETESOURCE,
          payload: payload.full_source_name
        })
      }
      return response;
    } catch (error) {
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}

export function GetSources() {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const response = await GetSourcesApi({ username: state.auth.UserDetail.userName });
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
