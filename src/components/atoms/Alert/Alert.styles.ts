import styled from "styled-components";

import { MdWarningAmber } from "react-icons/md";

import { lighten } from "utils/colorManipulator";

const Root = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: flex-start;
  padding: 10px;
  background-color: ${({ theme }) =>
    lighten(theme.palette.background[theme.value], 0.05)};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
`;

const Indication = styled.div`
  width: 10px;
  height: 100%;  
  background-color: ${({ theme }) => theme.palette.secondary[theme.value]};
  border-radius: ${({ theme }) =>
    `${theme.shape.borderRadius} 0px 0px ${theme.shape.borderRadius}`};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 12px;
`;

const Icon = styled(MdWarningAmber)`
  margin-right: 10px;
`;

export { Root, Indication, Content, Icon };
