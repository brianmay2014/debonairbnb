import React, { useState, useEffect } from "react";
import { ratingLabels } from "./StarRating";


const SingleEmoji = ({emoji, rating, currentRating, setCurrentRating, hoverRating, setHoverRating}) => {
    const [illuminated, setIlluminated] = useState(false);

    const handleMouseEnter = (e) => {
      e.preventDefault();
      setHoverRating(rating)
    }

    const handleMouseLeave = (e) => {
      e.preventDefault()
      setHoverRating(0)
    }

    const handleClick = (e) => {
      e.preventDefault()
      if (currentRating === rating) {
        setCurrentRating(0)
        setHoverRating(0)
      } else {
        setCurrentRating(rating);

      }
    }

    useEffect(() => {
      if (rating <= currentRating || rating <= hoverRating) {
        setIlluminated(true)
      } else {
        setIlluminated(false)
      }
    }, [rating, currentRating, hoverRating])

    return (
      <span
        key={`emoji-rating-${rating}`}
        className={`emoji-rating-emoji ${illuminated ? "on" : "off"}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >{emoji}</span>
    );
  };

const EmojiRatingComponent = ({ emoji, onEmojiClick, maxRating, defaultRating }) => {
  const [currentRating, setCurrentRating] = useState(defaultRating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    onEmojiClick(currentRating)
  }, [currentRating, onEmojiClick])

  const emojis = []
  for (let i=1; i <= maxRating; i++) {
    emojis.push(
      <SingleEmoji
        key={i}
        rating={i}
        emoji={emoji}
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
      />
    );
  }

  const label = currentRating ? `Selected Rating: ${currentRating}` : "Select a Rating"

  return (
    <div className={"emoji-ratings"}>
      {emojis} {label}
    </div>

  );
};

export default EmojiRatingComponent;
