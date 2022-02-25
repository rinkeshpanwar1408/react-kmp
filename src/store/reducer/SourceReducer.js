import * as Actions from "../action";
//local file change
const initialState = {
  Source: [],
};
const SourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CREATESOURCE:
      return { ...state, Source: [...state.Source,action.payload] }
    default:
      return state;
  }
};

export default SourceReducer;
