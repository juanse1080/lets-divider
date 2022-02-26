import { CustomLink } from "./components";

import { Root } from "./Navbar.styles";

export type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  return (
    <Root>
      <CustomLink to="/basic">Basic</CustomLink>
      <CustomLink to="/client">Client</CustomLink>
    </Root>
  );
};

export default Navbar;
