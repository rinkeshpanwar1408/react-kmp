import ActionResponse from "../../model/response";
import { authApi as Api } from "../../utility/axios";
import * as Actions from "./index";

export const Login = async (data) => {
  try {
    const response = await Api.get(`/userinfo/fetchUserDetails/${data.username}/${data.password}`);
    return response;
  } catch (error) {
    let errorInfo;
    // if (error.response) {
    //   errorInfo = error.response.data.ErrorInfo["0"];
    //   // displayErrorMessage(error.response)
    // } else {
    //   errorInfo = error.message;
    //   // displayErrorMessage(error.message)
    // }
    errorInfo = error.message;
    throw errorInfo;
  }
};

export function LoginUser(payload, cb, errorcb) {
  return async function (dispatch) {
    try {
      const response = await Login(payload);
      //Dispatch
      
      return response;
    } catch (error) {
      if (errorcb) errorcb(error);
      dispatch({ type: Actions.SETERROR, payload: error });
      throw (error);
    }
  };
}


