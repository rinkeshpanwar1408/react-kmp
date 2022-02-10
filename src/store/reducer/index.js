import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import SearchResultsReducer from "./searchResultsReducer";

const rootReducer = combineReducers({
  searchresults: SearchResultsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;