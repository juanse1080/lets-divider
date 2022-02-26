import React, { FC } from "react";

import PropTypes from "prop-types";

import { useTheme } from "hooks";

import Root from "./Container.styles";

export declare type ContainerProps = {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fixed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: FC<ContainerProps> = ({ maxWidth = "lg", ...others }) => {
  const theme = useTheme();

  return <Root {...others} maxWidth={maxWidth} theme={theme} />;
};

// @ts-ignore
Container.propTypes = {
  fixed: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

export default Container;
