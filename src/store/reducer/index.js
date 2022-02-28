import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ErrorReducer from "./ErrorReducer";
import SearchResultsReducer from "./searchResultsReducer";
import SourceReducer from "./SourceReducer";
import ThemeReducer from "./ThemeReducer";

const rootReducer = combineReducers({
  searchresults: SearchResultsReducer,
  theme:ThemeReducer,
  error:ErrorReducer,
  source:SourceReducer,
  // auth:AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;