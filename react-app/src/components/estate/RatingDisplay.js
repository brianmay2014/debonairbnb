import React from "react";
import { ratingEmoji } from "./StarRating";

const RatingDisplay = ({rating, places}) => {
    if (! rating) {
        return <>No Reviews!</>
    }
    return  (<>{places ? rating?.toFixed(places) : rating}{ratingEmoji}</>)
}

export default RatingDisplay;
