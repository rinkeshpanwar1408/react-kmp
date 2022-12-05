import ActionResponse from "../../model/response";
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";

export const Login = async (data) => {
  try {
    const response = await Api.post("/user/login", { "userName": data.username, "password": data.password });
    return response;
  } catch (error) {
    let errorInfo;
    errorInfo = error.message;
    throw errorInfo;
  }
};

export function signUpUser(payload, cb, errorcb) {
  return async function (dispatch) {
    try {
      const response = await Api.post("/user/createUser", payload);
      if (response.data) {
        dispatch({
          type: Actions.LOGINUSER,
          payload: {...payload}
        }
        );
      }
      return response;
    } catch (error) {
      return {
        data:{
          message: "There was some problem while requesting the data"
        }
      }
    }
  }
}

export function LoginUser(payload, cb, errorcb) {
  return async function (dispatch) {
    try {
      const response = await Login(payload);
      // debugger;

      //Dispatch
      if (response.data) {
        dispatch({
          type: Actions.LOGINUSER,
          payload: response.data
        }
        );
      }
      return response;
    } catch (error) {
      return {
        data:{
          message: "There was some problem while requesting the data"
        }
      }
      if (errorcb) errorcb(error);
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}

export function AutoLogin(payload, cb, errorcb) {
  return async function (dispatch) {
    try {
      dispatch({
        type: Actions.LOGINUSER,
        payload: JSON.parse(payload)
      });
      return payload;
    } catch (error) {
      if (errorcb) errorcb(error);
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}


export function LogoutUser(cb, errorcb) {
  return async function (dispatch) {
    try {
      //Dispatch
      dispatch({
        type: Actions.LOGOUTUSER,
      })
    } catch (error) {
      if (errorcb) errorcb(error);
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}
