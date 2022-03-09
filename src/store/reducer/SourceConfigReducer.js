import * as Actions from "../action";

const initialState = {
    SourceConfigs: [],
    SourceConfigDetail: {},
};
const SourceConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CREATESOURCECONFIG:
            return { ...state, SourceConfigs: [...state.SourceConfigs, action.payload] }
        case Actions.GETSOURCECONFIGS:
            return { ...state, SourceConfigs: action?.payload }
        case Actions.GETSOURCECONFIGDETAIL:
            return { ...state, SourceConfigDetail: action?.payload }
        default:
            return state;
    }
};

export default SourceConfigReducer;
