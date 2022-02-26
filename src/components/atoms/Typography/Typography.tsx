import React, { FC } from "react";
// import PropTypes from "prop-types";

import { useTheme } from "hooks";

import Paragraph from "./Typography.styles";

import { fontVariant, variantMapping } from "./Typography.constants";
import type { variantType } from "./Typography.constants";

type colorType =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "grey"
  | "black"
  | "inherit";

export declare type TypographyProps = {
  component?: React.ElementType;
  bold?: boolean;
  color?: colorType | string;
  variant?: variantType;
} & React.HTMLAttributes<HTMLElement>;

const Typography: FC<TypographyProps> = ({
  bold = false,
  color = "black",
  component,
  variant = "p",
  style: defaultStyle = {},
  ...props
}: TypographyProps) => {
  const theme = useTheme();

  const colorDefinition = {
    black: theme.common.black,
    inherit: "inherit",
    primary: theme.palette.primary[theme.value],
    secondary: theme.palette.secondary[theme.value],
    error: theme.palette.error[theme.value],
    warning: theme.palette.warning[theme.value],
    info: theme.palette.info[theme.value],
    success: theme.palette.success[theme.value],
    grey: theme.palette.grey[theme.value],
  };

  let colorApply: string = color;

  if (color in colorDefinition) {
    colorApply = colorDefinition[color as keyof typeof colorDefinition];
  }

  const style = {
    "--color": colorApply,
    ...fontVariant[variant],
    "--bold": bold ? "700" : fontVariant[variant]["--bold"],
    ...defaultStyle,
  };

  const newProps = {
    ...props,
    theme,
    style,
    as: component || variantMapping[variant],
  };

  return <Paragraph {...newProps} />;
};

// Typography.propTypes = {
//   as: PropTypes.elementType,
//   bold: PropTypes.bool,
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "error",
//     "warning",
//     "info",
//     "success",
//     "grey",
//     "black",
//   ]),
//   variant: PropTypes.oneOf([
//     "h1",
//     "h2",
//     "h3",
//     "p",
//     "p1",
//     "p2",
//     "field",
//     "link",
//     "italic",
//   ]),
// };

export default Typography;
