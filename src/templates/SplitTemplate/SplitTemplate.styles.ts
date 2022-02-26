import styled from "styled-components";

import BaseContainer, { ContainerProps } from "components/atoms/Container";
import BaseGrid, { GridProps } from "components/atoms/Grid";

const Container = styled(BaseContainer)<ContainerProps>`
  margin-top: 37px;
  height: calc(100vh - 37px);
`;

const GridScroll = styled(BaseGrid)<GridProps>``;

export { Container, GridScroll };
