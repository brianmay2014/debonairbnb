import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar";
import RatingDisplay from "./RatingDisplay";
import { useSelector, useDispatch } from "react-redux"
import { deleteCritique, editCritique } from "../../store/critique"
import { genEstates } from "../../store/estate";
import { Modal } from "../../context/Modal";
import EmojiRatingComponent from './EmojiRatingComponent';
import { ratingEmoji } from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";


dayjs.extend(calendar)

const IndCritiqueDelButton = ({critique}) => {
	  const sessionUser = useSelector((state) => state.session.user);
  	  const [showModal, setShowModal] = useState(false);

	if (!sessionUser || sessionUser.id !== critique?.user_id) {
		return null;
	}
	return (
    <>
      <FontAwesomeIcon icon={faTrashCan} onClick={() => setShowModal(true)}/>
	  {showModal && (<Modal onClose={() => setShowModal(false)}>
		  <IndCritiqueDeleteModal critique={critique} setShowModal={setShowModal} />
	  </Modal>)}
    </>
  );

}

const IndCritiqueDeleteModal = ({critique, setShowModal}) => {
	const dispatch = useDispatch();
	const handleDelete = async (e) => {
		const deleteConfirm = await dispatch(deleteCritique(critique));
		if (deleteConfirm) {
			setShowModal(false)
		} else {
			return;
		}
	};
	return (
    <div className={"critique-delete-display"}>
      <h2>Delete Critique?</h2>
      <IndCritique critique={critique} showControls={false} />
      <button className="btn" onClick={handleDelete}>
        Confirm Delete?
      </button>
    </div>
  );
}
/// 000000000000000000000000

const IndCritiqueEditButton = ({ critique }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser || sessionUser.id !== critique?.user_id) {
    return null;
  }
  return (
    <>
      <FontAwesomeIcon
        icon={faPenFancy}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <IndCritiqueEditModal
            critique={critique}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

const IndCritiqueEditModal = ({ critique, setShowModal }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(critique.rating)
  const [body, setBody] = useState(critique.comment)
  const [errors, setErrors] = useState({})

  const disabled = Object.keys(errors).length > 0;

  const handleSubmit = async (e) => {
	e.preventDefault();
	const updateCritique = {...critique}
	updateCritique.rating = rating;
	updateCritique.comment = body;
    const editConfirm = await dispatch(editCritique(updateCritique));
    if (editConfirm.errors) {
      setErrors(editConfirm.errors)
	  return;
    } else {
	  await dispatch(genEstates())
      setShowModal(false);
    }
  };
  return (
    <form className="critiqueAddForm  critique-boxes" onSubmit={handleSubmit}>
	  <h2>Edit Critique</h2>
      <div className={"critique-input"}>
        <div className={"critique-input-container"}>
          <EmojiRatingComponent
            emoji={ratingEmoji}
			defaultRating={rating}
            onEmojiClick={(r) => setRating(r)}
            maxRating={5}
          />
          <textarea
            className={"critique-text-area"}
            name="body"
            placeholder="Leave a review... "
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <button className={"btn"} disabled={disabled} type="submit">
        Update Critique
      </button>
      {Object.keys(errors).length > 0 && (
        <div className="errors">
          {Object.keys(errors).map(
            (key) => `${key.toUpperCase()}: ${errors[key]}`
          )}
        </div>
      )}
    </form>
  );
};

const IndCritique = ({ critique, showControls=true }) => {
	// const { id } = useParams();

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	const user = useSelector((state) => state.session.user);
	const critId = critique.id;
	const critUser = critique.userId;
	const timeformat = dayjs.unix((critique.created_at)).calendar(dayjs());

	return (
    <div className="critique-boxes" id={`critique-${critId}`}>
      <div className={"critique-controls"}>
        {showControls && <IndCritiqueDelButton critique={critique} />}
        {showControls && <IndCritiqueEditButton critique={critique} />}
      </div>

      <div className="critique-users">
        {critique?.username} (<RatingDisplay rating={critique?.rating} />)
      </div>
      <div className="critique-dates">{timeformat}</div>
      <div className="critique-comments">{critique.comment}</div>
    </div>
  );
};

export default IndCritique;
