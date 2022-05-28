import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";

const IndCritique = ({ critique }) => {
	// const { id } = useParams();

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);

	// const { address, owner_id, title, nightly_rate, type_id, description } =
	// 	estate;
	// const avg_rating = 4.5;
	// const rating_count = 15;

	const critId = critique.id;
	critique.date = "05/24/2022";

	return (
		<div className='critique-boxes' id={`critique-${critId}`}>
			<div className="critique-users">User Id: {critique.userId}</div>
			<div className="critique-dates">Date: {critique.date}</div>
			<div className="critique-comments">{critique.comment}</div>
		</div>
	);
};

export default IndCritique;
