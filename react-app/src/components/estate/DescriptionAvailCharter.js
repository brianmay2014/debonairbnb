import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import CharterForm from "./CharterForm";

const estate = {
	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
	owner_id: 2,
	title: "Bozeman Overlook",
	nightly_rate: 790,
	type_id: 3,
	description:
		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
};


const DescriptionAvailCharter = () => {
	const { id } = useParams();

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);

	const { address, owner_id, title, nightly_rate, type_id, description } =
		estate;
    
    const ownerName = "Jerrey";
    const numGuests = 6;
    const numBaths = 3;
    const numBeds =  6;


	return (
		<div id="desc-avail-charter">
            <div id='dac-left'>
                <div id='description-header'>
                    {title} hosted by {ownerName}
                </div>
                <div id='estate-details'>
                    {numGuests} guests - {numBeds} beds - {numBaths} baths
                </div>
                <div id='estate-description'>
                    {description}
                </div>
            </div>
            <div id='dac-right'>
                <CharterForm />
            </div>
		</div>
	);
};

export default DescriptionAvailCharter;

