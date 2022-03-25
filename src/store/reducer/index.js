import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import SearchResultsReducer from "./searchResultsReducer";
import SourceConfigReducer from "./SourceConfigReducer";
import SourceReducer from "./SourceReducer";
import ThemeReducer from "./ThemeReducer";
import WorkSpaceReducer from "./WorkSpaceReducer";

const rootReducer = combineReducers({
  searchresults: SearchResultsReducer,
  theme:ThemeReducer,
  error:ErrorReducer,
  source:SourceReducer,
  sourceConfig:SourceConfigReducer,
  auth:AuthReducer,
  workspace:WorkSpaceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;