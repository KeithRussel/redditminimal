import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <NavLink to="#">
        <img
          alt="Reddit Client"
          className="logo"
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
        />
      </NavLink>
    </header>
  );
};

export default Header;
