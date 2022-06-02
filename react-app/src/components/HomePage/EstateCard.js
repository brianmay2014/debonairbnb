import React, { useState, useEffect, useRef } from "react";
import RatingDisplay from "../estate/RatingDisplay";
import CrossfadeImage from "react-crossfade-image";

import "./HomePage.css";

const EstateCard = ({ estate, showType }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [carouseling, setCarouseling] = useState(false);
  const carouselLength = estate?.images?.length;
  const img = estate?.images[imageIndex];
  const src = img?.url;
  const interval = useRef();

  const address = `${estate?.city}, ${estate?.state}`;
  const typeLine = `${estate?.type} in ${address}`;

  useEffect(() => {
    if (carouseling) {
      interval.current = setInterval(() => {
        setImageIndex((index) => (index + 1) % carouselLength);
      }, 3000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [carouseling, carouselLength]);

  return (
    <div className="estate-cards" id={`estate-card-${estate?.id}`}>
      <div id="type-filter-bar"></div>
      <div className="home-card-img" id="estate-display">
        <a
          href={`/estates/${estate?.id}`}
          onMouseEnter={() => setCarouseling(true)}
          onMouseLeave={() => setCarouseling(false)}
        >
          {src ? <CrossfadeImage src={src} alt={img?.title} duration={2200} /> : <p className={"no-img"}>No Images</p>}
        </a>
      </div>
      <div className="home-card-text">
        <div className="card-top-bar">
          <div className="card-address">{showType ? typeLine : address}</div>
          <div className="card-critique">
            <RatingDisplay rating={estate?.rating} places={2} />
          </div>
        </div>
        <div className="card-availabilty">Feb 1-6</div>
        <div className="card-cost">
          ${estate?.nightly_rate} <span className="per-night">per night</span>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
