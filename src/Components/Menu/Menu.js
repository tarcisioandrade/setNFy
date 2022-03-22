import React from "react";
import "./Menu.css";
import { ReactComponent as UserIcon } from "../../imgs/person-sharp.svg";
import { ReactComponent as Logo } from "../../imgs/logo.svg";
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
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const { username } = useSelector((state) => state.setToken.data);

  function openModal() {
    setToggleModal(true);
  }
  function closeModal() {
    setToggleModal(false);
  }

  React.useEffect(() => {
    function handleToggleDropDown() {
      if (toggleDropdown) {
        setToggleDropdown(false);
      }
    }
    document.body.addEventListener("click", handleToggleDropDown);
    return () => {
      document.body.removeEventListener("click", handleToggleDropDown);
    };
  }, [toggleDropdown]);

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
          <UserIcon
            className="menu__user_icon--user"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />
          <p className="menu__user_name">{username}</p>
        </div>
        <ul
          className={`menu__user_dropdown ${
            toggleDropdown && "menu__user_dropdown--active"
          }`}
        >
          <li className="menu__user_logout-target">
            <div className="menu__user_icon--logout"></div>
            <p
              onClick={() => {
                openModal();
                setConfirmLogout({
                  action: logout,
                  message: "Deseja encerrar a sessão?",
                });
              }}
            >
              Sair
            </p>
          </li>
        </ul>
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
