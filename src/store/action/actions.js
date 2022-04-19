import * as Actions from "./index";
import { instanceApi as Api } from "../../utility/axios";

export const getSearchedData = (searchedWord,filters={"authorFilter": [],"sourceFilter": [],"departmentFilter": []}) => {
  return async (dispatch,getState) => {
    const userDetails = getState().auth;
    let response = await Api.post(
      `/text/searchlist.json/${searchedWord}/1/false/department/false/true/?params=%7B%7D`,
      {
        "userName": userDetails.userName,
        "userDepartment": userDetails.userDepartment,
        "managementLevelId": userDetails.managementLevelId,
        "jobTitle": userDetails.jobTitle,
        "documentCategory": "",
        "sortedFilter": "",
        ...filters
      }
    );
 
    dispatch({
      type: Actions.GETSEARCHDATA,
      payload: {
        data: response.data,
        keyword: searchedWord,
      },
    });
  };
};

export const getSearchItemPreviewData = (id) => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETSEARCHITEMPREVIEWDATA,
      payload: {
        id: id,
      },
    });
  };
};

export const getQuickLinkDetails = (id) => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETQUICKLINKDETAIL,
      payload: {
        id: id,
      },
    });
  };
};

export const getCaseStudyDetails = (techName) => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETCASESTUDYDETAIL,
      payload: {
        techName: techName,
      },
    });
  };
};

