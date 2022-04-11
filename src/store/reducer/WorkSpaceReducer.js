import * as Actions from "../action";

const initialState = {
    WorkSpaces: [],
    SelectedWorkspace: "",
};
const WorkSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CHANGEWORKSPACE:
            return { ...state, SelectedWorkspace: action.payload }
        case Actions.GETWORKSPACES:
            return { ...state, WorkSpaces: action.payload }
        case Actions.CREATEWORKSPACE:
            return {
                ...state,
                WorkSpaces: [...state.WorkSpaces, action.payload],
                WorkSpaceDetail: {
                    workspace_name: action.payload.workspace_name,
                    description: action.payload.description,
                    id: action.payload.id
                }
            }
        case Actions.GETCURRENTWORKSPACEDETAIL:
            return { ...state, WorkSpaceDetail: action?.payload }
        default:
            return state;
    }
};

export default WorkSpaceReducer;
