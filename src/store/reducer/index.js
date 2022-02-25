import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ErrorReducer from "./ErrorReducer";
import SearchResultsReducer from "./searchResultsReducer";
import ThemeReducer from "./ThemeReducer";
import SourceReducer from "./SourceReducer";

const rootReducer = combineReducers({
  searchresults: SearchResultsReducer,
  theme:ThemeReducer,
  error:ErrorReducer,
  SourceReducer:SourceReducer  //local
  // auth:AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;