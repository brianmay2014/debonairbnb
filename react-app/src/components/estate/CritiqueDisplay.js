import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import IndCritique from "./IndCritique";
import { genCritiques } from "../../store/critique";
import { ratingEmoji } from "./StarRating";


// const estate = {
// 	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
// 	owner_id: 2,
// 	title: "Bozeman Overlook",
// 	nightly_rate: 790,
// 	type_id: 3,
// 	description:
// 		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
// };

const critiques = [
{id: 1, userId: 1, estateId: 1, rating: 4, comment: "Great estate, very spacious, will let my friends know about the listing"},
{id: 2, userId: 2, estateId: 2, rating: 3, comment: "Took forever to charter the estate, it's so popular you can see they turned around the cleaning a little faster than they should"},
{id: 3, userId: 3, estateId: 3, rating: 2, comment: "The bathroom needed to be cleaned, I will not share what I found inside"},
{id: 21, userId: 3, estateId: 1, rating: 4, comment: "Great construction, very solid build"},
{id: 22, userId: 1, estateId: 2, rating: 3, comment: "The library had me distracted, I barely spent any time in other rooms. Beautiful books though"},
{id: 23, userId: 2, estateId: 3, rating: 5, comment: "The way the sun filtered in the master bedroom in the morning was perfection"}
];


const CritiqueDisplay = ( {estate} ) => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (estate) {
			dispatch(genCritiques(estate))
		}
	}, [estate, dispatch]);

	const critiques = useSelector((state) => state.critiques);
	const critiquesCount = Object.keys(critiques).length;


	return (
    <div id="critique-display-body">
      <div id="critique-header">
        {estate?.rating.toFixed(2)} {ratingEmoji} ({critiquesCount} critiques)
      </div>
      <div id="all-critiques">
        {Object.values(critiques).map((critique) => {
          // console.log(critique);
          return (
            <IndCritique key={`critique-${critique.id}`} critique={critique} />
          );
        })}
      </div>
    </div>
  );
};

export default CritiqueDisplay;
