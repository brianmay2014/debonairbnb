import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar";
import RatingDisplay from "./RatingDisplay";
dayjs.extend(calendar)


const IndCritique = ({ critique, usersData }) => {
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
	const critUser = critique.userId;
	const timeformat = dayjs.unix((critique.created_at)).calendar(dayjs());

	return (
		<div className='critique-boxes' id={`critique-${critId}`}>
			<div className="critique-users">{critique?.username} (<RatingDisplay rating={critique?.rating} />)</div>
			<div className="critique-dates">{timeformat}</div>
			<div className="critique-comments">{critique.comment}</div>
		</div>
	);
};

export default IndCritique;
