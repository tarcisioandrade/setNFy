import React from "react";
import "./Menu.css";
import { ReactComponent as UserIcon } from "../../imgs/person-sharp.svg";
import { ReactComponent as Logo } from "../../imgs/logo.svg";
import { ReactComponent as Logout } from "../../imgs/logout.svg";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/slices/setUser";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useSelector } from "react-redux";

const Menu = () => {
  const [confirmLogout, setConfirmLogout] = React.useState({
    id: null,
    action: null,
    message: null,
  });
  const [toggleModal, setToggleModal] = React.useState(false);
  const { username } = useSelector((state) => state.setToken.data);

  function openModal() {
    setToggleModal(true);
  }
  function closeModal() {
    setToggleModal(false);
  }

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
          <NavLink end to="/">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="finalizados">Finalizadas</NavLink>
        </li>
      </ul>
      <div className="menu__user">
        <div className="menu__user_content">
          <UserIcon className="menu__user_icon menu__user_icon--user" />
          <p className="menu__user_name">{username}</p>
        </div>
        <div className="menu__user_dropdown">
          <div
            className="menu__user_logout-target"
            onClick={() => {
              openModal();
              setConfirmLogout({
                action: logout,
                message: "Deseja encerrar a sessão?",
              });
            }}
          >
            <Logout className="menu__user_icon menu__user_icon--logout" />
            <p>Sair</p>
          </div>
        </div>
      </div>
      <ModalConfirm
        closeModal={closeModal}
        toggleModal={toggleModal}
        finalize={confirmLogout}
      />
    </header>
  );
};

export default Menu;
