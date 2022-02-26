import styled from "styled-components";
import { AiOutlineInfo } from "react-icons/ai";

import Typography from "../Typography";

export type ContentProps = {
  position?: "top right" | "top left" | "bottom left" | "bottom right";
  title?: string;
};

const Icon = styled(AiOutlineInfo)`
  background-color: var(--background-color);
  color: var(--color);
  border-radius: 50%;
`;

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const ContentRoot = styled.div<{ edge?: "start" | "end" }>`
  position: relative;
  display: flex;
  margin: ${({ edge }) =>
    edge === "start" ? "0px 0px 0px 5px" : "0px 5px 0px 0px"};

  & > svg {
    cursor: pointer;
    padding: 0.1em;
  }
`;

const Content = styled.span<ContentProps>`
  visibility: hidden;
  min-width: 250px;
  background-color: ${({ theme }) => theme.palette.secondary[theme.value]};
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  display: inline-block;

  opacity: 0;
  transition: opacity 0.3s;

  ${({ position }) =>
    position === "top right" &&
    `
    bottom: 130%;
    left: 5px;
    border-bottom-left-radius: 0px;
  `}
  ${({ position }) =>
    position === "top left" &&
    `
    bottom: 130%;
    right: 0;
    border-bottom-right-radius: 0px;
  `}
     ${({ position }) =>
    position === "bottom left" &&
    `
    top: 130%;
    right: 7px;
    border-top-right-radius: 0px;
  `}
${({ position }) =>
    position === "bottom right" &&
    `
    top: 130%;
    left: 7px;
    border-top-left-radius: 0px;
  `}

  ${ContentRoot}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Text = styled(Typography)`
  margin: 0;
  text-transform: none;
`;

export { Root, Icon, Content, ContentRoot, Text };
