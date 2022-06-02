import React, {useEffect, useRef, useState} from "react";
import CrossfadeImage from "react-crossfade-image";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";

// const estate = {
// 	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
// 	owner_id: 2,
// 	title: "Bozeman Overlook",
// 	nightly_rate: 790,
// 	type_id: 3,
// 	description:
// 		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
// };

// const images = [
// 	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/a29c28ab-814d-4e6d-b3e5-40596e17ae03.jpeg",
// 	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/5999b661-a257-4686-a830-c58c9e681be3.jpeg",
// 	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/4be2df54-ea6d-4aab-955e-eec96b3147b7.jpeg",
// 	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/8292c786-b74f-4297-a7fb-f21fa59f494e.jpeg",
// 	"https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/1238ce4f-94e6-445b-abaf-8c73aa50e9e3.jpeg",
// ];

const ImageDisplay = ( { estate }) => {

	//map images from state for display
	const imgUrls = estate?.images.map((obj) => obj.url);
	const imgDesc = estate?.images.map((obj) => obj.title);

	const [imgDisplays, setImgDisplays] = useState(estate?.images.map(i => {
		return (
      		<img
			  key={i.id}
			  src={i.url}
			  alt={`${estate.title} ${i.title}`}
			/>
    	);
	}));
	const mainImg = imgDisplays?.length ? imgDisplays[0] : null;
	const clusterImg = imgDisplays?.slice(1,5);

	const interval = useRef();

	useEffect(() => {
		interval.current = setInterval(() => {
			const displayCopy =  [...imgDisplays];
			const first = displayCopy.shift();
			displayCopy.push(first);
			setImgDisplays(displayCopy)
		}, 10000)
		return () => clearInterval(interval.current)
	},[imgDisplays])

	if (!mainImg) {
		clearInterval(interval.current)
		return (
		<div id="img-display-body">
			<div id="main-image">
			<p className="no-img"> No images!</p>
			</div>
		</div>
		);
	}

	return (
		<div>
		{imgUrls && (
			<div id="image-display-body">
				<div id="main-image">
					{mainImg}
				</div>
				<div id="cluster-images">
					{clusterImg}
				</div>
		</div>
			)}
		</div>
	);
};

export default ImageDisplay;
