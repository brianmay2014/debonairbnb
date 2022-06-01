import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeCritique } from "../../store/critique";
import EmojiRatingComponent from "./EmojiRatingComponent";
import ratingEmoji from "./StarRating";

function EstateCritiqueForm({ estate }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(null);
  const [errors, setErrors] = useState([]);
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
    if (data && data.errors) {
      setErrors(data.errors);
      return;
    }
    console.log(data);
    const critique = await dispatch(makeCritique(data));
    if (critique)
    setBody("");
  };

  useEffect(() => {
    setDisabled(body.length === 0);
  }, [body]);

  return (
    <form className="critiqueAddForm" onSubmit={handleSubmit}>
      <div className="critiqueInput">
        <textarea
          name="body"
          placeholder="Leave a review... "
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <EmojiRatingComponent
          emoji={ratingEmoji}
          onEmojiClick={(r) => setRating(r)}
          maxRating={5}
        />
        <button className={"btn"} disabled={disabled} type="submit">
          Leave Critique
        </button>
      </div>
    </form>
  );
}

export default EstateCritiqueForm;
