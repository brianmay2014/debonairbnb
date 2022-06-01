import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar";
import RatingDisplay from "./RatingDisplay";
import { useSelector, useDispatch } from "react-redux"
import { deleteCritique } from "../../store/critique"
import { Modal } from "../../context/Modal";

dayjs.extend(calendar)

const IndCritiqueDelButton = ({critique}) => {
	  const sessionUser = useSelector((state) => state.session.user);
  	  const [showModal, setShowModal] = useState(false);

	if (!sessionUser) {
		return null;
	}
	return (
    <>
      <i className="fa-trash critique-delete-button" onClick={() => setShowModal(true)}/>
	  <Modal onClose={() => setShowModal(false)}>
		  <IndCritiqueDeleteModal critique={critique} setShowModal={setShowModal} />
	  </Modal>
    </>
  );

}

const IndCritiqueDeleteModal = ({critique, setShowModal}) => {
	return <>Test</>
}


const IndCritique = ({ critique, usersData }) => {
	// const { id } = useParams();

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	const user = useSelector((state) => state.session.user);
	const critId = critique.id;
	const critUser = critique.userId;
	const isOwnedByThisUser = critUser === user?.id;
	const timeformat = dayjs.unix((critique.created_at)).calendar(dayjs());

	return (
		<div className='critique-boxes' id={`critique-${critId}`}>
			<IndCritiqueDelButton critique={critique} />
			<div className="critique-users">{critique?.username} (<RatingDisplay rating={critique?.rating} />)</div>
			<div className="critique-dates">{timeformat}</div>
			<div className="critique-comments">{critique.comment}</div>
		</div>
	);
};

export default IndCritique;
