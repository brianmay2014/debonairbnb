// import LogoutButton from "../../auth/LogoutButton";
import React, { useState, useEffect } from "react";
// import { Redirect, useHistory, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import "./HostPatronButton.css";

const HostPatron = () => {
	// const dispatch = useDispatch();
	// const [showMenu, setShowMenu] = useState(false);

	// const openMenu = () => {
	// 	if (showMenu) return;
	// 	setShowMenu(true);
	// };

	// useEffect(() => {
	// 	if (!showMenu) return;

		const toHostPage = () => {
			// return redirec;
		};

	// 	document.addEventListener("click", closeMenu);

	// 	return () => document.removeEventListener("click", closeMenu);
	// }, [showMenu]);

	return (
		<div>
			<a className="host-button btn" href='/host'>
				Become a Host
			</a>

			
		</div>
	);
};

export default HostPatron;
