import * as Actions from "../action";

const initialState = {
    WorkSpaces: [],
    WorkSpaceDetail: {},
};
const WorkSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GETWORKSPACES:
            return { ...state, WorkSpaces: action.payload }
        case Actions.CREATEWORKSPACE:
            return { ...state, WorkSpaces: [...state.WorkSpaces, action.payload] }
        case Actions.GETCURRENTWORKSPACEDETAIL:
            return { ...state, WorkSpaceDetail: action?.payload }
        default:
            return state;
    }
};

export default WorkSpaceReducer;
