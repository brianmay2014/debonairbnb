import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generatePath, useParams } from "react-router-dom";
import './estatePage.css';
import ImageDisplay from "./ImageDisplay";
import DescriptionAvailCharter from "./DescriptionAvailCharter";
import CritiqueDisplay from "./CritiqueDisplay";
import { genEstates } from "../../store/estate";
// import { genUsers } from "../../store/user";
import LocationDisplay from "./LocationDisplay";
import { genCritiques } from "../../store/critique";
import EstateCritiqueForm from "./EstateCritiqueForm";
import { ratingEmoji } from "./StarRating";
import RatingDisplay from "./RatingDisplay";

const EstatePage = ({setCharterPayload}) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const estate = useSelector((state) => state.estates[id]);
  const user = useSelector((state) => state.session.user);
  const critiquesCount = useSelector((state) => Object.keys(state.critiques).length)

  useEffect(() => {
	if (estate) {
		dispatch(genCritiques(estate));
	}
  }, [dispatch, estate]);

  useEffect(() => {
	  dispatch(genEstates())
  }, [dispatch, critiquesCount])

  const address = `${estate?.city}, ${estate?.state}, ${estate?.country}`;

  return (
    <div id="estate-body">
      <div className="estate-head-info">
        <div id="estate-head-title">{estate?.title}</div>
        <div id="estate-head-info">
          <div>
           <RatingDisplay rating={estate?.rating} places={2}/> ({critiquesCount} critiques)
          </div>
          <div>{address}</div>
        </div>
      </div>
      <ImageDisplay estate={estate} />
      <DescriptionAvailCharter estate={estate} setCharterPayload={setCharterPayload}/>
	  <EstateCritiqueForm estate={estate} />
      <CritiqueDisplay estate={estate} />
      <LocationDisplay estate={estate} />
    </div>
  );
};;

export default EstatePage;
