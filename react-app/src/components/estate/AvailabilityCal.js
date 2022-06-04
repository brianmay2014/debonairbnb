import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import {dateArrayCreator} from "../../utils/dateArrayCreator"
import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './CalendarFix.css';

const AvailabilityCal = ({ estate, stateVars } ) => {
	// const { id } = useParams();

	const today = new Date()

	let {
		checkinDate,
		setCheckinDate,
		checkoutDate,
		setCheckoutDate,
		nightStay,
		setNightStay,
	} = stateVars;

// console.log(checkinDate, checkoutDate, today, 'AHHHHHHH')

	const [state, setState] = useState([
		{
			// startDate: new Date(),
			// endDate: addDays(new Date(), 7),
			// key: "selection",
			startDate: today,
			endDate: addDays(today, 1),
			key: "selection",
			color: '#c28849'
		},
	]);

	const charters = useSelector((state) => Object.values(state.charters))

	const estateCharters = charters?.filter(charter => estate?.id === charter.estate_id)



	let disabledDatesArray = []

	estateCharters?.forEach(charter => {
		(dateArrayCreator(addDays(new Date (charter?.start_date), 1), addDays(new Date (charter.end_date), 1))).forEach(date => {
			disabledDatesArray.push(date)
		})
	})

	useEffect(() => {
		setCheckinDate(state[0].startDate)
		setCheckoutDate(state[0].endDate)
		// console.log(disabledDatesArray)
	}, [state])

	useEffect(() => {
		state[0].startDate = checkinDate;
		state[0].endDate = checkoutDate;
	}, [checkinDate, checkoutDate])

	return (
		<div id="avail-cal">
			<p id='avail-info'>{nightStay} nights stay in {estate?.city}</p>
			<DateRangePicker
				onChange={(item) => setState([item.selection])}
				showSelectionPreview={true}
				moveRangeOnFirstSelection={false}
				months={2}
				ranges={state}
				direction="horizontal"
				disabledDates={disabledDatesArray}
				dragSelectionEnabled={true}
			/>
			<p id='date-notice'>*To ensure the utmost cleanliness, we require a deep cleaning of the estate. <br></br>Therefore you cannot book a charter until the day after the last patron has checked out.</p>
		</div>
	);
};

export default AvailabilityCal;
