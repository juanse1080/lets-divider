import styled from "styled-components";

import { darken, lighten } from "utils/colorManipulator";

const Root = styled.nav`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    lighten(theme.palette.background[theme.value], 0.05)};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  color: ${({ theme }) => darken(theme.common.white, 0.3)};
  z-index: ${({ theme }) => theme.zIndex.appBar};
`;

export { Root };
