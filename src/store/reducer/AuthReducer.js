import * as Actions from "../action";

const initialState = {
    UserDetail: {},
};
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGINUSER:
            return { ...state, UserDetail: action.payload }
        case Actions.LOGOUTUSER:
            return state
        default:
            return state;
    }
};

export default AuthReducer;
