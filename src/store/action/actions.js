import * as Actions from "./index";
import { instanceApi as Api } from "../../utility/axios";

export const getSearchedData = (searchedWord, page = 1, filters = { "authorFilter": [], "sourceFilter": [], "departmentFilter": [] }) => {
  return async (dispatch, getState) => {
    const userDetails = getState().auth.UserDetail;
    let response = await Api.post(
      `/text/searchlist.json/${searchedWord}/${page}/false/department/false/true/?params=%7B%7D`,
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
    debugger;
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

export const addremoveLikeFromSearchResult = (searchresultId, feedback) => {
  return async (dispatch, getState) => {
    const userDetails = getState().auth.UserDetail;
    const searchDetail = getState().searchresults;
    debugger;
    let response = await Api.post(
      `document/feedback`, {
      enableFeedback: feedback,
      feedBackType: true,
      id: searchresultId,
      searchStr: searchDetail.searchValue,
      userName: userDetails.userName,
    });


    debugger;
    dispatch({
      type: Actions.ADDREMOVELIKEFROMSEARCHRESULT,
      payload: {
        searchId: searchresultId,
        feedback
      },
    });

  };
};

