import { useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";


import { Link } from "./CustomLink.styles";

const CustomLink = ({ to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link active={!!match} to={to} {...props} />;
};

export default CustomLink;
