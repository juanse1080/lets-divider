import { ReactNode } from "react";
import Typography from "../Typography";

import { Root, Indication, Content, Icon } from "./Alert.styles";

export type AlertProps = {
  title?: string;
  children: ReactNode;
};

const Alert = ({ children, ...props }: AlertProps) => {
  return (
    <Root {...props}>
      <Indication />
      <Content>
        <Icon size="25" />
        {typeof children === "string" ? (
          <Typography color="inherit" variant="h3">
            {children}
          </Typography>
        ) : (
          children
        )}
      </Content>
    </Root>
  );
};

export default Alert;
