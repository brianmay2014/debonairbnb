import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeCritique } from "../../store/critique";
import EmojiRatingComponent from "./EmojiRatingComponent";
import RatingDisplay from "./RatingDisplay";
import { ratingEmoji, ratingLabels } from "./StarRating";

function EstateCritiqueForm({ estate }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id: sessionUser.id,
      estate_id: estate.id,
      comment: body,
      rating: rating,
    };
    setErrors({});
    const critique = await dispatch(makeCritique(data));
    if (critique.errors) {
      console.log(critique.errors)
      setErrors(critique.errors);
      return;
    }
    if (critique && Object.keys(errors).length === 0) {
      setBody("");
      setRating(0);
    }
  };

  useEffect(() => {
    setDisabled(body.length === 0);
  }, [body]);

  const ratingInner = (rating !== 0) &&
  <>
    <h3>Rating Guide: {ratingLabels[rating].label} (<RatingDisplay rating={rating} />)</h3>
    <p>{ratingLabels[rating].description}</p>
  </>;

  return (
    <form className="critiqueAddForm  critique-boxes" onSubmit={handleSubmit}>
      <div className={"critique-input"}>
        <div className={"critique-input-container"}>
          <EmojiRatingComponent
            emoji={ratingEmoji}
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
        <div className={"rating-descriptions"}>
          {ratingInner}
        </div>
      </div>
      <button className={"btn"} disabled={disabled} type="submit">
        Leave Critique
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
}

export default EstateCritiqueForm;
