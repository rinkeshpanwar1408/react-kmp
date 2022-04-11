import { Card } from "antd";
import styled from "styled-components";
import * as Theme from "../model/Theme";


export const StyledCard = styled(Card)`
  border-radius: ${Theme.border_radius_large};
  box-shadow: 0px 1px 4px
    rgba(
      ${(props) =>
    props.theme.themestyle === "light"
      ? Theme.light_shadow_color
      : Theme.dark_shadow_color},
      0.5
    );
  background-color:${(props) => props.theme.themestyle === "light" ? Theme.common_light_extra_color_8 : Theme.common_dark_extra_color_8};
  margin-bottom: 1.6rem;
  border: none;
`;

export const StyledInfoBox = styled.div`
    min-height:9rem;
    border-radius:${Theme.border_radius_large};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1.5rem;
`
