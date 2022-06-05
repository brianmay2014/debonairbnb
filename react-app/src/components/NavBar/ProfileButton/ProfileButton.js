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

  const closeMenu = () => {
		setShowMenu(false);
  };

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
						<div className="profile-dropdown-container">
							<li>
								<NavLink
									to="/sign-up"
									exact={true}
									activeClassName="active"
									onClick={closeMenu}
								>
									Sign Up
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/login"
									exact={true}
									activeClassName="active"
									onClick={closeMenu}
								>
									Login
								</NavLink>
							</li>
						</div>
					)}

					{sessionUser && (
						<>
							<li>
								<NavLink
									to="/"
									exact={true}
									activeClassName="active"
									onClick={closeMenu}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/users/${sessionUser.id}/my-charters/`}
									activeClassName="active"
									onClick={closeMenu}
								>
									My Charters
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/users/${sessionUser.id}/estates/`}
									activeClassName="active"
									onClick={closeMenu}
								>
									My Estates
								</NavLink>
							</li>
							{/* <li>
                <NavLink to="/users" exact={true} activeClassName="active">
                  Users
                </NavLink>
              </li> */}
							<li>
								<LogoutButton closeMenu={closeMenu} />

							</li>
						</>
					)}
				</ul>
			)}
		</div>
  );
};

export default ProfileButton;
