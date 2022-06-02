import LogoutButton from "../../auth/LogoutButton";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileButton.css";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div>
      <button className="menu-button btn" onClick={openMenu}>
          Profile
      </button>

      {showMenu && (
        <ul
          className="profile-dropdown-menu"
          onClick={(e) => e.stopPropagation()}
        >
          {!sessionUser && (
            <>
              <li>
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" exact={true} activeClassName="active">
                  Login
                </NavLink>
              </li>
            </>
          )}

          {sessionUser && (
            <>
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={`/users/${sessionUser.id}/my-charters/`} activeClassName="active">
                  My Charters
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" exact={true} activeClassName="active">
                  Users
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
