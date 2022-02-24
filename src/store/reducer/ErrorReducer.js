import * as Actions from "../action";

const initialState = {
  Error: null,
};
const ErrorReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case Actions.SETERROR:
      return { ...state, Error: action?.payload }
    default:
      return state;
  }
};

export default ErrorReducer;
