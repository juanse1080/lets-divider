import styled from "styled-components";
import { darken, lighten } from "utils/colorManipulator";
import Typography, { TypographyProps } from "../Typography";

const Root = styled.div<{ fullWidth?: boolean; disabled?: boolean }>`
  border: 0;
  margin: 0;
  display: inline-flex;
  padding: 0;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
`;

const Label = styled.label<{ shrink?: boolean }>`
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: flex-start;
  position: absolute;
  transform-origin: top left;
  transform: ${({ shrink }) =>
    shrink
      ? "translate(8px, 34px) scale(0.83)"
      : "translate(14px, 43px) scale(1)"};
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: var(--color);

  text-transform: uppercase;
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  z-index: 1;
`;

const TextAreaRoot = styled.div`
  color: var(--color);
  cursor: text;
  display: inline-flex;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  align-items: center;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  line-height: 1.1876em;
  letter-spacing: 0.00938em;
  padding: 25px 12px 8px;

  background-color: ${({ theme }) =>
    lighten(theme.palette.background[theme.value], 0.05)};
  border-radius: ${({ theme }) =>
    `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0px 0px`};

  &:after,
  &:before {
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    pointer-events: none;
  }

  &:before {
    content: "\\00a0";
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[theme.value]};
  }

  &:after {
    content: "";
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid var(--border);
    transform: var(--scale);
  }

  &:hover:not([disabled]):not([readonly]):before {
    border-bottom: 1px solid
      ${({ theme }) => darken(theme.palette.secondary[theme.value], 0.3)};    
  }
`;

const TextArea = styled.textarea`
  font: inherit;
  color: currentColor;
  width: 100%;
  border: 0;
  margin: 0;
  display: block;
  padding: 0;
  min-width: 0;
  background: none;
  animation-name: auto-fill-cancel;
  letter-spacing: inherit;
  animation-duration: 10ms;
  -webkit-tap-highlight-color: transparent;
  font-family: Montserrat, sans-serif;

  resize: none;
  height: auto;

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey[theme.value]};
    font-weight: 400;
    font-style: italic;
  }
`;

const TextAreaHidden = styled.textarea`
  font: inherit;
  color: currentColor;
  width: 100%;
  border: 0;
  margin: 0;
  display: block;
  padding: 0;
  min-width: 0;
  background: none;
  animation-name: auto-fill-cancel;
  letter-spacing: inherit;
  animation-duration: 10ms;
  -webkit-tap-highlight-color: transparent;
  font-family: Montserrat, sans-serif;

  visibility: hidden;
  position: absolute;
  overflow: hidden;
  height: 0;
  top: 0;
  left: 0;
  transform: translateZ(0);

  resize: none;
`;

const HelperText = styled(Typography)<
  TypographyProps & {
    align: "left" | "right";
  }
>`
  margin: 3px 6px 0px;
  color: var(--color);
  text-align: ${({ align }) => align};
`;

const HelperRoot = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  Root,
  Label,
  TextArea,
  HelperText,
  HelperRoot,
  TextAreaRoot,
  TextAreaHidden,
};
