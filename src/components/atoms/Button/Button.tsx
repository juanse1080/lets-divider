import React, { FC } from "react";
import PropTypes from "prop-types";

import { AiOutlineRight } from "react-icons/ai";

import { useTheme } from "hooks";

import { ButtonStyled, LabelStyled } from "./Button.styles";
import { darken, lighten } from "utils";

export declare type ButtonProps = {
  variant?: "primary" | "secondary" | "text";
  color?: string;
  withArrow?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  withArrow = false,
  fullWidth = false,
  variant = "text",
  color,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const { palette, value: currentTheme, common } = theme;

  const width = fullWidth ? "100%" : "auto";

  let style: object = {
    ...props.style,
  };

  switch (variant) {
    case "primary":
      style = {
        "--width": width,

        "--background": palette.primary[currentTheme],
        "--border": palette.primary[currentTheme],
        "--color": common.white,

        "--hover-background": palette.secondary[currentTheme],
        "--hover-border": palette.secondary[currentTheme],
        "--hover-color": common.white,

        "--disabled-background": palette.grey[currentTheme],
        "--disabled-border": palette.grey[currentTheme],
        "--disabled-color": common.lightGrey,
        ...style,
      };
      break;

    case "secondary":
      style = {
        "--width": width,

        "--background": palette.secondary[currentTheme],
        "--border": palette.secondary[currentTheme],
        "--color": common.white,

        "--hover-background": darken(palette.secondary[currentTheme], 0.2),
        "--hover-border": darken(palette.secondary[currentTheme], 0.2),
        "--hover-color": common.white,

        "--disabled-background": lighten(palette.background[currentTheme], 0.4),
        "--disabled-border": lighten(palette.background[currentTheme], 0.4),
        "--disabled-color": common.white,
        ...style,
      };
      break;

    case "text":
      style = {
        "--width": width,

        "--background": "transparent",
        "--border": "transparent",
        "--color": color ? color : palette.primary[currentTheme],

        "--hover-background": "transparent",
        "--hover-border": "transparent",
        "--hover-color": palette.secondary[currentTheme],

        "--disabled-background": "transparent",
        "--disabled-border": "transparent",
        "--disabled-color": palette.grey[currentTheme],
        ...style,
      };
      break;
  }

  const newProps = {
    ...props,
    style,
    disabled,
  };

  return (
    <ButtonStyled {...newProps}>
      <LabelStyled variant="p1" color="currentColor">
        {children}
        {withArrow && (
          <span>
            <AiOutlineRight title="Arrow" />
          </span>
        )}
      </LabelStyled>
    </ButtonStyled>
  );
};

// @ts-ignore
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "text"]),
  color: PropTypes.string,
  withArrow: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
