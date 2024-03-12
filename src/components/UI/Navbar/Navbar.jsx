import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Выйти</MyButton>
      <div className="navbar__links">
        <NavLink className="navbar__link" activeclassname="active" to="/about">
          О сайте
        </NavLink>
        <NavLink className="navbar__link" activeclassname="active" to="/posts">
          Посты
        </NavLink>
        <NavLink className="navbar__link" activeclassname="active" to="/todo">
          ToDo
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
