import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './CalendarFix.css';

const AvailabilityCal = ({ estate, stateVars } ) => {
	// const { id } = useParams();

	let {
		checkinDate,
		setCheckinDate,
		checkoutDate,
		setCheckoutDate,
		nightStay,
		setNightStay,
	} = stateVars;
	
	const [state, setState] = useState([
		{
			// startDate: new Date(),
			// endDate: addDays(new Date(), 7),
			// key: "selection",
			startDate: checkinDate,
			endDate: checkoutDate,
			key: "selection",
			color: '#c28849'
		},
	]);
	
	
	useEffect(() => {
		// console.log(state);
		// console.log(typeof state[0].endDate);
		setCheckinDate(state[0].startDate)
		setCheckoutDate(state[0].endDate)
	}, [state])

	useEffect(() => {
		state[0].startDate = checkinDate;
		state[0].endDate = checkoutDate;
	}, [checkinDate, checkoutDate])

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
