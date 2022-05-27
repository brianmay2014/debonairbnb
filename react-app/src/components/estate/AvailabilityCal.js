import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const estate = {
	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
	owner_id: 2,
	title: "Bozeman Overlook",
	nightly_rate: 790,
	type_id: 3,
	description:
		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
};

const AvailabilityCal = () => {
	const { id } = useParams();

    const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: "selection",
		},
	]);

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);


	return (
		<div id="avail-cal">
			Availability
			<DateRangePicker
				onChange={(item) => setState([item.selection])}
				showSelectionPreview={true}
				moveRangeOnFirstSelection={false}
				months={2}
				ranges={state}
				direction="horizontal"
			/>
		</div>
	);
};

export default AvailabilityCal;
