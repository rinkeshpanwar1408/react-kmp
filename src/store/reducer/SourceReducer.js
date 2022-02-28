import * as Actions from "../action";

const initialState = {
    Sources: [],
    SourceDetail: {},
};
const SourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CREATESOURCE:
            return { ...state, Source: [...state.Sources,action.payload] }
        case Actions.GETSOURCES:
            return { ...state, Sources: action?.payload }
        case Actions.GETSOURCEDETAIL:
            return { ...state, SourceDetail: action?.payload }
        default:
            return state;
    }
};

export default SourceReducer;
