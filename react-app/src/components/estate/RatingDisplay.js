import React from "react";
import { ratingEmoji } from "./StarRating";

const RatingDisplay = ({rating, places}) => {
    return  (<>{places ? rating?.toFixed(places) : rating}{ratingEmoji}</>)
}

export default RatingDisplay;
