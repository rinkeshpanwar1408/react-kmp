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
        case Actions.DELETESOURCECONFIG:
            const newSourceConfigList = state.SourceConfigs.filter(i => i.full_config_name !== action?.payload)
            return { ...state, SourceConfigs: newSourceConfigList }
        default:
            return state;
    }
};

export default SourceConfigReducer;
