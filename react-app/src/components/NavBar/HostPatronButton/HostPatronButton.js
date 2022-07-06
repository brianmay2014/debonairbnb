import React from "react";
import { useSelector } from 'react-redux'
import "./HostPatronButton.css";

const HostPatron = () => {

	const user = useSelector((state) => state.session.user);


	return (
		<div>
			<a className="host-button btn" href={`/users/${user?.id}/estates`}>
				Become a Host
			</a>


		</div>
	);
};

export default HostPatron;
