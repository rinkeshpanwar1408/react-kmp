import * as Actions from "../action";

const intialState = {
  searchedData: [],
  quickLinkDetail: {},
  caseStudyDetail: null,
  tags: null,
  filters: [],
  previewData: null,
  searchValue: "",
};

const checkDuplicateArrValue = (compareVal, destinationArr) => {
  if (destinationArr.indexOf(compareVal) === -1) {
    destinationArr.push(compareVal);
  }
};

const getQuickLinks = (searchedData, id) => {
  const activetags = [];
  const disabletags = [];

  const quickLinkDetail = searchedData.find((item) => item.id === String(id));

  if (quickLinkDetail) {
    quickLinkDetail.technology.forEach((item, i) => {
      if (quickLinkDetail.graphDetails) {
        const sameTechData = JSON.parse(quickLinkDetail.graphDetails.sameTech);
        const sameIndustryData = JSON.parse(
          quickLinkDetail.graphDetails.sameIndustry
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

      }
    });

    return {
      quickLinkDetail,
      tags: [...activetags, ...disabletags],
    };
  }
};

const getCaseStudyLinks = (quickLinkDetails, techName) => {
  const sameTechData = JSON.parse(quickLinkDetails.graphDetails.sameTech);
  const sameIndustryData = JSON.parse(
    quickLinkDetails.graphDetails.sameIndustry
  );

  if (sameTechData[techName]) {
    return {
      caseStudyDetail: {
        title: techName,
        data: sameTechData[techName],
      },
    };
  } else {
    return {
      caseStudyDetail: {
        title: techName,
        data: sameIndustryData[techName],
      },
    };
  }
};

const SearchResultsReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.GETSEARCHDATA:
      const searchedData = action.payload.data;
      if (searchedData && searchedData.length > 0) {
        let sourceArray = [];
        let roleArray = [];
        let authorArray = [];

        searchedData.forEach((element) => {
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

        const filters = [{
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
        ];

        const result = getQuickLinks(searchedData, searchedData[0].id);

        if (result.quickLinkDetail && result.tags.length > 0) {
          const activeTag = result.tags.find((tag) => tag.active);

          let otherCaseStudyData = null;
          if (activeTag) {
            otherCaseStudyData = getCaseStudyLinks(
              result.quickLinkDetail,
              activeTag.title
            );
          }

          return {
            ...state,
            searchedData: searchedData,
            filters: filters,
            quickLinkDetail: result.quickLinkDetail,
            tags: result.tags,
            searchValue: action.payload.keyword,
            ...otherCaseStudyData,
          };
        }

        return {
          ...state,
          searchedData: searchedData,
          filters: filters,
          quickLinkDetail: result.quickLinkDetail,
          tags: result.tags,
          searchValue: action.payload.keyword,
        };
      }
      return {
        ...state,
        searchedData: searchedData,
        searchValue: action.payload.keyword
      };
    case Actions.GETQUICKLINKDETAIL:
      const result = getQuickLinks(state.searchedData, action.payload.id);

      if (result) {
        const activeTag = result.tags.find((tag) => tag.active);
        let otherCaseStudyData = null;
        if (activeTag) {
          otherCaseStudyData = getCaseStudyLinks(
            result.quickLinkDetail,
            activeTag.title
          );
        }

        return {
          ...state,
          quickLinkDetail: result.quickLinkDetail,
          tags: result.tags,
          ...otherCaseStudyData,
        };
      }

      return {
        ...state,
        quickLinkDetail: result.quickLinkDetail,
        tags: result.tags,
      };
    case Actions.GETSEARCHITEMPREVIEWDATA:
      const previewData = state.searchedData.find((item) => item.id === action.payload.id);

      if (previewData) {
        const authors = previewData.author;
        const authorsString = authors.join(",");

        return {
          ...state,
          previewData: {
            ...previewData,
            author: authorsString
          },
        };
      }

      return state;
    case Actions.GETCASESTUDYDETAIL:
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

      const caseStudyResult = getCaseStudyLinks(
        state.quickLinkDetail,
        action.payload.techName
      );

      return {
        ...state,
        ...caseStudyResult,
        tags: tagdata,
      };

    case Actions.GETSEARCHVALUE:
      return {
        ...state,
        searchValue: action.payload.searchValue,
      };

    case Actions.ADDREMOVELIKEFROMSEARCHRESULT:
      const searchResultItem = state.searchedData.find((item) => item.id === action.payload.searchId);
      const searchResultItemIndex = state.searchedData.findIndex((item) => item.id === action.payload.searchId);

      if (searchResultItem) {
        const newResult = { ...searchResultItem };
        const newSearchData = [...state.searchedData];
        if (!newResult.elasticDocumentRating) {
          newResult.elasticDocumentRating = {
            thumbsUpCount: action.payload.feedback ? 1 : 0,
            thumbsDownCount: 0,
            searchString: state.searchValue
          }
        }
        else {
          let thumbsUpCount = newResult.elasticDocumentRating.thumbsUpCount;
          newResult.elasticDocumentRating.thumbsUpCount = action.payload.feedback ? thumbsUpCount + 1 : thumbsUpCount - 1
        }
        newResult.isThumbsUp = action.payload.feedback ? true : null

        newSearchData[searchResultItemIndex] = newResult;
        return {
          ...state,
          searchedData: newSearchData,
        };
      }

      return state;

    default:
      return state;
  }
};

export default SearchResultsReducer;