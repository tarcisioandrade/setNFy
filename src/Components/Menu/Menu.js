import React from "react";
import "./Menu.css";
import { ReactComponent as HomeIcon } from "../../imgs/home-outline.svg";
import { ReactComponent as DoneIcon } from "../../imgs/checkmark-done-outline.svg";
import { ReactComponent as UserIcon } from "../../imgs/person-sharp.svg";

const Menu = () => {
  return (
    <header className="menu">
      <a href="/" className="menu__logo">
        SetNFy
      </a>

      <ul className="menu__ul">
        <li>
          <HomeIcon className="menu__icon" />
          <a href="/">Inicio</a>
        </li> 
        <li>
          <DoneIcon className="menu__icon" />
          <a href="finalizados">Finalizados</a>
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
