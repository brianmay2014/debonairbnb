import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";

const LocationDisplay = ({ estate }) => {


    const address = `${estate?.city}, ${estate?.state}, ${estate?.country}`;

	return (
		<div id="location-display">
			<div id='location-header'>
                Where you'll be...
            </div>
            <div id='google-display'>
                Just imagine a pretty google maps represenation, oooooo la la.
            </div>
            <div id='location-footer'>
                <div id='loc-name'>
                    {address}
                </div>
                <div id='loc-description'>
                    {estate?.description}
                    </div>
            </div>

		</div>
	);
};

export default LocationDisplay;
