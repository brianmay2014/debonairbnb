// import LogoutButton from "../../auth/LogoutButton";
import React, { useState, useEffect } from "react";
// import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genEstates } from "../../store/estate";
import "./HostPage.css";

const HostPage = () => {
	// const dispatch = useDispatch();
	// const [showMenu, setShowMenu] = useState(false);


	// 	document.addEventListener("click", closeMenu);

	// 	return () => document.removeEventListener("click", closeMenu);
	// }, [showMenu]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(genEstates());
        // dispatch(genUsers());
    }, [dispatch]);

    const estates = useSelector((state) => state.estates);
    console.log(estates);

    const user = useSelector((state) => state.session.user);
    console.log(user);
    console.log(user.id);

    const estatesArr = Object.values(estates);
    console.log(estatesArr)

    const userEstates = estatesArr.filter((estate) => estate.owner_id === user.id);
    console.log(userEstates);

	return (
		<div>
            <h1> Welcome to the truffle and caviar of debonairbnb, hosting estates</h1>
            
        
		</div>
	);
};

export default HostPage;
