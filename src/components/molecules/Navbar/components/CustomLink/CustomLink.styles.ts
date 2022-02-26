import styled from "styled-components";
import { Link as RouteLink } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { darken } from "utils/colorManipulator";

const Link = styled(RouteLink).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["active"].includes(prop) && defaultValidatorFn(prop),
})<
  LinkProps & {
    active?: boolean;
  }
>`
  padding: 10px 4px;
  margin: 0px 10px;
  color: ${({ active, theme }) =>
    active ? theme.common.white : darken(theme.common.white, 0.2)};
  border-bottom: 1px solid
    ${({ active, theme }) =>
      active ? theme.palette.secondary[theme.value] : "transparent"};
  text-decoration: none;
`;

export { Link };
