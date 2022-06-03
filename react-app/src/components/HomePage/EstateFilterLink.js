import React, { useState, useEffect, useRef } from "react";
import RatingDisplay from "../estate/RatingDisplay";
import CrossfadeImage from "react-crossfade-image";

import "./HomePage.css";
import estateReducer from "../../store/estate";

const EstateFilterLink = ({ estateType, handleClick, currentFilter }) => {

  if (!estateType) {
      return null;
  }

  const trueHandleClick = () => {
      if (currentFilter === estateType.id) {
          handleClick(null)
      } else {
          handleClick(estateType.id)
      }
  }


  return (
    <span
        key={`${estateType.id}${estateType.name}`}
        className={`estate-type-filter-link${currentFilter === estateType.id ? " selected" : ""}`}
        onClick={trueHandleClick}>
            {estateType.name}
    </span>
  );
};

export default EstateFilterLink;
