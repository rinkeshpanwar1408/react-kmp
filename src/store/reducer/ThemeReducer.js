import * as Actions from "../action";
import { LightBlueTheme } from "../../model/Theme";


const initialState = {
  Theme: LightBlueTheme,
  Fullscreen: false,
  MenuCollapsed: false,
};
const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATETHEME:
      return { ...state, Theme: action?.themeKey };
    case Actions.UPDATEFULLSCREENSTATUS:
      return { ...state, Fullscreen: action.fullscreen };
    case Actions.SETMENUCOLLAPSED:
      return { ...state, MenuCollapsed: action.collapsed };
    default:
      return state;
  }
};

export default ThemeReducer;
