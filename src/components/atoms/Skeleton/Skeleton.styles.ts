import styled from "styled-components";
import { lighten } from "utils";

const Root = styled.span<{ fullWidth?: boolean; disabled?: boolean }>`
  display: inline-block;
  height: 36px;
  width: 100%;
  position: relative;
  overflow: hidden;

  background-color: ${({ theme }) =>
    lighten(theme.palette.background[theme.value], 0.05)};
  border-radius: ${({ theme }) => theme.shape.borderRadius};

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    transform: translateX(-100%);
    background-image: ${({ theme }) => `linear-gradient(
      90deg,
      ${lighten(theme.palette.background[theme.value], 0.05)} 0,
      ${lighten(theme.palette.background[theme.value], 0.1)} 20%,
      ${lighten(theme.palette.background[theme.value], 0.15)} 60%,
      ${lighten(theme.palette.background[theme.value], 0.2)}
    )`};
    animation: shimmer 2s infinite;
    content: "";
  }
`;

export default Root;
