import * as Actions from "../action";

const initialState = {
    UserDetail: {},
};
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGINUSER:
            localStorage.setItem('userDetail', JSON.stringify(action.payload));
            return { ...state, UserDetail: action.payload }
        case Actions.LOGOUTUSER:
            localStorage.getItem("userDetail");
            if (localStorage.getItem("userDetail")) {
                localStorage.removeItem("userDetail");
            }
            return state
        default:
            return state;
    }
};

export default AuthReducer;
