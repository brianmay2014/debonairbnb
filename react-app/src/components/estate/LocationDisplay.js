import React, { useCallback, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	useJsApiLoader,
	Marker,
    Circle,
    Autocomplete
} from "@react-google-maps/api";
// import {Circle} from 'react-google-maps'
import "./estatePage.css";

const LocationDisplay = ({ estate, gKey }) => {

    const containerStyle = {
		width: "100%",
		height: "100%",
	};

    const [map, setMap] = useState(null);

        const { isLoaded } = useJsApiLoader({
			id: "google-map-script",
			googleMapsApiKey: gKey,
		});

    // const onLoad = useCallback(function callback(map) {
	// 	if (estate) {
	// 		const bounds = new window.google.maps.LatLngBounds({
	// 			lat: estate?.latitude,
	// 			lng: estate?.longitude,
	// 		});
	// 		map.fitBounds(bounds);
	// 		setMap(map);
	// 	}
	// }, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

    const address = `${estate?.city}, ${estate?.state}, ${estate?.country}`;


    const options = {
		strokeColor: "#9f703f",
		strokeOpacity: 0.8,
		strokeWeight: 5,
		fillColor: "#c28849",
		fillOpacity: 0.55,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		radius: 600,
		zIndex: 1,
	};

	return isLoaded ? (
		<div id="location-display">
			<div id="location-header">Where you'll be...</div>
			<div id="google-display">
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{ lat: estate?.latitude, lng: estate?.longitude }}
					zoom={13}
					// onLoad={onLoad}
					onUnmount={onUnmount}
					className="google-map-estate-show"
				>
					{/* Child components, such as markers, info windows, etc. */}
					<Circle
                    center={{
                        lat: estate?.latitude,
						lng: estate?.longitude,
                    }}
                    options={options}/>
				</GoogleMap>
			</div>
			<div id="location-footer">
				<div id="loc-name">{address}</div>
				<div id="loc-description">{estate?.description}</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default LocationDisplay;
