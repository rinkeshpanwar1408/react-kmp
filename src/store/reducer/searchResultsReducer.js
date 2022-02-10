import * as Actions from "../action";
import data from "../../data.json";

const intialState = {
  searchedData: data,
  quickLinkDetail: data[0],
  caseStudyDetail: null,
};

const SearchResultsReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.GETQUICKLINKDETAIL:
      const data = state.searchedData.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        quickLinkDetail: data,
      };

    case Actions.GETCASESTUDYDETAIL:
      const sameTechData = JSON.parse(
        state.quickLinkDetail.graphDetails.sameTech
      );
      const sameIndustryData = JSON.parse(
        state.quickLinkDetail.graphDetails.sameIndustry
      );

      if (sameTechData[action.payload.techName]) {
        return {
          ...state,
          caseStudyDetail: {
            title: action.payload.techName,
            data: sameTechData[action.payload.techName],
          },
        };
      } else {
        return {
          ...state,
          caseStudyDetail: {
            title: action.payload.techName,
            data: sameIndustryData[action.payload.techName],
          },
        };
      }

    default:
      return state;
  }
};

export default SearchResultsReducer;
