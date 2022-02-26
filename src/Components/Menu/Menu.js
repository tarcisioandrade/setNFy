import React from "react";
import "./Menu.css";
import { ReactComponent as HomeIcon } from "../../imgs/home-outline.svg";
import { ReactComponent as DoneIcon } from "../../imgs/checkmark-done-outline.svg";
import { ReactComponent as UserIcon } from "../../imgs/person-sharp.svg";
import { ReactComponent as Logo } from "../../imgs/logo.svg";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header className="menu">
      <div className="menu__logo-content">
          <Logo />
        <a href="/" className="menu__logo">
          SetNFy
        </a>
      </div>

      <ul className="menu__ul">
        <li>
          <HomeIcon className="menu__icon" />
          <Link to="/">Inicio</Link>
          {/* <a href="/">Inicio</a> */}
        </li>
        <li>
          <DoneIcon className="menu__icon" />
          <Link to="finalizados">Finalizadas</Link>
        </li>
      </ul>
      <div className="menu__user">
        <UserIcon className="menu__user_icon" />
        <p className="menu__user_name">Tarcisio Andrade</p>
      </div>
    </header>
  );
};

export default Menu;
