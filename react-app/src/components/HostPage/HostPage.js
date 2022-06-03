// import LogoutButton from "../../auth/LogoutButton";
import React, { useState, useEffect } from "react";
// import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genEstates } from "../../store/estate";
import EstateForm from "./EstateForm";
import EstateRow from "./EstateRow";
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

    //should re-render the page when a new estate is added
    const estates = useSelector((state) => state.estates);
    // console.log(estates);

    const user = useSelector((state) => state.session.user);
    // console.log(user);
    // console.log(user.id);

    const estatesArr = Object.values(estates);
    // console.log(estatesArr)

    const userEstates = estatesArr.filter((estate) => estate.owner_id === user.id);

	return (
		<div>
			<h1 id="my-estates-header">
				{" "}
				My Estates
			</h1>

			{userEstates.length && (
				<div id="hosted-estates-container">
					{userEstates.map((estate) => {
						return (
							<EstateRow
								key={`hosted-${estate.id}`}
								estate={estate}
							/>
						);
					})}
				</div>
			)}

			{userEstates.length === 0 && (
				<div>
					<h2>We don't see any estates listed from your account.</h2>
					<h3>
						It would be our absolute honour, if you were to host
						your estates.
					</h3>
				</div>
			)}

			<EstateForm />
		</div>
	);
};

export default HostPage;
