import React, { FC } from "react";
import PropTypes from "prop-types";

import { useTheme } from "hooks";

import { Root, Content, Icon, ContentRoot, Text } from "./Tooltip.styles";
import type { ContentProps } from "./Tooltip.styles";

export declare type TooltipProps = {
  content?: string;
  edge?: "start" | "end";
  icon?: React.ReactNode;
} & ContentProps &
  React.HTMLAttributes<HTMLElement>;

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  edge = "start",
  title,
  position = "top right",
  icon,
  ...props
}) => {
  const theme = useTheme();

  const style: object = {
    "--color": theme?.palette.primary[theme.value],
    "--background-color": theme?.palette.secondary[theme.value],
  };

  return (
    <Root {...props}>
      {edge === "start" && children}
      <ContentRoot edge={edge}>
        {icon || <Icon style={style} size="0.8em" />}
        <Content theme={theme} position={position} title={title}>
          {!!title && (
            <Text variant="link" bold color="primary">
              {title}
            </Text>
          )}
          <Text variant="field" color="primary">
            {content}
          </Text>
        </Content>
      </ContentRoot>
      {edge === "end" && children}
    </Root>
  );
};

// @ts-ignore
Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node,
  edge: PropTypes.oneOf(["start", "end"]),
  title: PropTypes.string,
  position: PropTypes.oneOf([
    "top right",
    "top left",
    "bottom left",
    "bottom right",
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Tooltip;
