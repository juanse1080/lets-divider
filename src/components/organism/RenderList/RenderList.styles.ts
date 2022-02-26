import styled from "styled-components";
import { lighten } from "utils/colorManipulator";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;  
`;

const ListItem = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) =>
    lighten(theme.palette.background[theme.value], 0.05)};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  margin: 3px;
`;

export { ListContainer, ListItem };
