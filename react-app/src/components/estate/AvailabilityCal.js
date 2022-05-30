import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const AvailabilityCal = ({ estate, stateVars } ) => {
	// const { id } = useParams();

	// let {
	// 	checkinDate,
	// 	setCheckinDate,
	// 	checkoutDate,
	// 	setCheckoutDate,
	// 	nightStay,
	// 	setNightStay,
	// } = stateVars;

	// if (checkinDate === undefined) checkinDate = new Date();

	const [state, setState] = useState([
		{
			// startDate: new Date(),
			// endDate: addDays(new Date(), 7),
			// key: "selection",
			startDate: stateVars?.checkinDate,
			endDate: stateVars?.checkoutDate,
			key: "selection",
			color: '#c28849'
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
