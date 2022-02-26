import styled from "styled-components";
import Typography from "../Typography";

export const ButtonStyled = styled.button`
  width: var(--width);
  background: var(--background);
  border: 2px solid var(--border);
  color: var(--color);
  padding: 3px 20px;
  display: inline-flex;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;

  &:disabled {
    cursor: not-allowed;
    color: var(--disabled-color);
    background: var(--disabled-background);
    border: 2px solid var(--disabled-border);
  }

  &:focus {
    outline: 0;
  }

  &:hover:not(:disabled) {
    background: var(--hover-background);
    color: var(--hover-color) !important;
    border: 2px solid var(--hover-border);
  }
`;

export const LabelStyled = styled(Typography)`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  margin: 0px;

  & > span {
    display: inherit;
    margin-left: 12px;
    margin-right: -4px;
    color: inherit;
    svg {
      fill: currentColor;
    }
  }
`;
