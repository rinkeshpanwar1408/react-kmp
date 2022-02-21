import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import SearchResultsReducer from "./searchResultsReducer";
import ThemeReducer from "./ThemeReducer";

const rootReducer = combineReducers({
  searchresults: SearchResultsReducer,
  theme:ThemeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;