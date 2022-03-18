import React from "react";
import "./Menu.css";
import { ReactComponent as HomeIcon } from "../../imgs/home-outline.svg";
import { ReactComponent as DoneIcon } from "../../imgs/checkmark-done-outline.svg";
import { ReactComponent as UserIcon } from "../../imgs/person-sharp.svg";
import { ReactComponent as Logo } from "../../imgs/logo.svg";
import { ReactComponent as Logout } from "../../imgs/logout.svg";
import { Link } from "react-router-dom";
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
  const {username} = useSelector((state) => state.setToken.data)


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
          <HomeIcon className="menu__icon" />
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <DoneIcon className="menu__icon" />
          <Link to="finalizados">Finalizadas</Link>
        </li>
      </ul>
      <div className="menu__user">
        <UserIcon className="menu__user_icon menu__user_icon--user" />
        <p className="menu__user_name">{username}</p>
        <Logout
          className="menu__user_icon menu__user_icon--logout"
          onClick={() => {
            openModal();
            setConfirmLogout({
              action: logout,
              message: "Deseja encerrar a sessão?",
            });
          }}
        />
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
