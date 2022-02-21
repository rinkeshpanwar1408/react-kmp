import styled from "styled-components";
import * as Theme from "../model/Theme";

export const StyledMainLayout = styled.div`
  display: flex;
  flex: auto;
  min-height: 100%;
`;

export const StyledMainContentContainer = styled.div`
  width:100%;
  background-color: ${(props) =>
    props.theme.themestyle === "light"
      ? Theme.lightBg
      : Theme.darkBg} !important;
`;
