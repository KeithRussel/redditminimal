import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer, Image } from "./styleHeader";

const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="#">
        <Image
          alt="Reddit Client"
          className="logo"
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
        />
      </NavLink>
    </HeaderContainer>
  );
};

export default Header;
