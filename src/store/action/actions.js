import * as Actions from "./index";

export const getSearchedData = () => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETSEARCHDATA,
    });
  };
};

export const getFilters = () => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETFILTERS,
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

export const getSearchValue = (searchValue) => {
  return (dispatch) => {
    dispatch({
      type: Actions.GETSEARCHVALUE,
      payload: {
        searchValue: searchValue,
      },
    });
  };
};
