import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";

const estate = {
	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
	owner_id: 2,
	title: "Bozeman Overlook",
	nightly_rate: 790,
	type_id: 3,
	description:
		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
};

const images = [
	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/a29c28ab-814d-4e6d-b3e5-40596e17ae03.jpeg",
	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/5999b661-a257-4686-a830-c58c9e681be3.jpeg",
	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/4be2df54-ea6d-4aab-955e-eec96b3147b7.jpeg",
	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/8292c786-b74f-4297-a7fb-f21fa59f494e.jpeg",
	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/1238ce4f-94e6-445b-abaf-8c73aa50e9e3.jpeg",
];

const ImageDisplay = () => {
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
	const avg_rating = 4.5;
	const rating_count = 15;

	return (
		<div id="image-display-body">
			<div id="main-image">
				<img src={`${images[0]}`}></img>
			</div>
			<div id="cluster-images">
				<img src={`${images[1]}`}></img>
				<img src={`${images[2]}`}></img>
				<img src={`${images[3]}`}></img>
				<img src={`${images[4]}`}></img>
			</div>
		</div>
	);
};

export default ImageDisplay;
