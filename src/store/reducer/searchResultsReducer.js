import * as Actions from "../action";
import data from "../../data.json";

const intialState = {
  searchedData: [],
  quickLinkDetail: data[0],
  caseStudyDetail: null,
  tags: null,
  filters: [],
};

const checkDuplicateArrValue = (compareVal, destinationArr) => {
  if (destinationArr.indexOf(compareVal) === -1) {
    destinationArr.push(compareVal);
  }
};

const SearchResultsReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.GETSEARCHDATA:
      return {
        ...state,
        searchedData: data,
      };

    case Actions.GETFILTERS:
      let sourceArray = [];
      let roleArray = [];
      let authorArray = [];

      if (state.searchedData.length > 0) {
        state.searchedData.forEach((element) => {
          if (element.source) {
            checkDuplicateArrValue(element.source, sourceArray);
          }

          if (element.departments) {
            element.departments.forEach((item) => {
              checkDuplicateArrValue(item, roleArray);
            });
          }

          if (element.author) {
            element.author.forEach((item) => {
              checkDuplicateArrValue(item, authorArray);
            });
          }
        });

        return {
          ...state,
          filters: [
            {
              title: "Source",
              data: sourceArray,
            },
            {
              title: "Role",
              data: roleArray,
            },
            {
              title: "Author",
              data: authorArray,
            },
          ],
        };
      } else {
        return state;
      }

    case Actions.GETQUICKLINKDETAIL:
      const activetags = [];
      const disabletags = [];

      const filterdata = state.searchedData.find(
        (item) => item.id === String(action.payload.id)
      );

      if (filterdata) {
        filterdata.technology.forEach((item, i) => {
          const sameTechData = JSON.parse(filterdata.graphDetails.sameTech);
          const sameIndustryData = JSON.parse(
            filterdata.graphDetails.sameIndustry
          );

          if (sameTechData[item] && sameTechData[item][0].name) {
            activetags.push({
              active: i === 0 && true,
              disable: false,
              title: item,
            });
          } else if (sameIndustryData[item] && sameIndustryData[item][0].name) {
            activetags.push({
              active: i === 0 && true,
              disable: false,
              title: item,
            });
          } else {
            disabletags.push({
              active: i === 0 && true,
              disable: true,
              title: item,
            });
          }
        });
      }

      return {
        ...state,
        quickLinkDetail: filterdata,
        tags: [...activetags, ...disabletags],
      };

    case Actions.GETCASESTUDYDETAIL:
      const sameTechData = JSON.parse(
        state.quickLinkDetail.graphDetails.sameTech
      );
      const sameIndustryData = JSON.parse(
        state.quickLinkDetail.graphDetails.sameIndustry
      );

      const tagdata = [...state.tags];
      const activeTag = state.tags.find((item) => item.active === true);
      const activeTagIndex = state.tags.findIndex(
        (item) => item.active === true
      );
      const currentTag = state.tags.find(
        (item) => item.title === String(action.payload.techName)
      );
      const currentTagIndex = state.tags.findIndex(
        (item) => item.title === String(action.payload.techName)
      );

      activeTag.active = false;
      currentTag.active = true;

      tagdata[activeTagIndex] = activeTag;
      tagdata[currentTagIndex] = currentTag;

      if (sameTechData[action.payload.techName]) {
        return {
          ...state,
          caseStudyDetail: {
            title: action.payload.techName,
            data: sameTechData[action.payload.techName],
          },
          tags: tagdata,
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
