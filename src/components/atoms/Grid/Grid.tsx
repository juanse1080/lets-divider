import React, { FC } from "react";
import PropTypes from "prop-types";

import { useTheme } from "hooks";

import type { GridRootProp } from "./Grid.styles";
import GridRoot from "./Grid.styles";

export type GridProps = Partial<GridRootProp> &
  React.HTMLAttributes<HTMLDivElement>;

const Grid: FC<GridProps> = ({
  alignContent = "stretch",
  alignItems = "stretch",
  container = false,
  direction = "row",
  item = false,
  justify = "flex-start",
  lg = false,
  md = false,
  sm = false,
  spacing = 0,
  wrap = "wrap",
  xl = false,
  xs = false,
  ...other
}) => {
  const theme = useTheme();

  const props = {
    theme,
    alignContent,
    alignItems,
    container,
    direction,
    item,
    justify,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    ...other,
  };

  return <GridRoot {...props} />;
};

// @ts-ignore
Grid.propTypes = {
  alignContent: PropTypes.oneOf([
    "stretch",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
  ]),
  alignItems: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "stretch",
    "baseline",
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.bool,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  item: PropTypes.bool,
  justify: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
  lg: PropTypes.oneOf([
    false,
    "auto",
    true,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
  md: PropTypes.oneOf([
    false,
    "auto",
    true,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
  sm: PropTypes.oneOf([
    false,
    "auto",
    true,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
  xl: PropTypes.oneOf([
    false,
    "auto",
    true,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
  xs: PropTypes.oneOf([
    false,
    "auto",
    true,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]),
};

export default Grid;
