
import { sourceApi as Api } from "../../utility/axios";
import * as Actions from "./index";

//Source Actions

export const Source = async (data) => {
    try {
      const response = await Api.post('/source/create',data);
      return response;
    } catch (error) {
      let errorInfo;
  
      errorInfo = error.message;
      throw errorInfo;
    }
  };
  export function CreateSource(payload) {
    return async function (dispatch) {
      try {
        const response = await Source(payload);
        
        return response;
      } catch (error) {
       
        dispatch({ type: Actions.SETERROR, payload: error });
        throw (error);
      }
    };
  }
  