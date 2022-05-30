import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import { getCheckinDate, getCheckoutDate, getNightStay } from "./utils";

const CharterForm = ( {estate, stateVars} ) => {
	// const { id } = useParams();

	// const [checkinDate, setCheckinDate] = useState(getCheckinDate());
	// const [checkoutDate, setCheckoutDate] = useState(getCheckoutDate());
	// const [nightStay, setNightStay] = useState(getNightStay());

    //cleaning rate, can set up fancy randomizer, or just leave it as 15% of one night's stay
    const cleanRate = 0.15;

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);

	
	let {
		checkinDate,
		setCheckinDate,
		checkoutDate,
		setCheckoutDate,
		nightStay,
		setNightStay,
	} = stateVars;
	
	useEffect(() => {

	}, [checkinDate, checkoutDate, nightStay]);

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	const setCheckinFunc = async (e) => {
		setCheckinDate(e.target.value)
		setNightStay(getNightStay(checkinDate, checkoutDate))
	}

	const setCheckoutFunc = async (e) => {
		setCheckoutDate(e.target.value)
		setNightStay(getNightStay(checkinDate, checkoutDate));
	};

	const errors = [];

	// const { address, owner_id, title, estate?.nightly_rate, type_id, description } =
	// 	estate;


    const baseCost = nightStay * estate?.nightly_rate;
    const cleanCost = estate?.nightly_rate * cleanRate;
    const servCost = 0;
    const totalCost = baseCost + cleanCost + servCost;


	return (
		<div id="charter-form">
			<form id="charter-reserve-form" onSubmit={handleSubmit}>
				<ul className="form-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<p>${estate?.nightly_rate} / night</p>
				<div className="checkdates">
					<label>Check-in</label>
					<input
						type="date"
						value={checkinDate}
						required
						onChange={setCheckinFunc}
					/>
				</div>
				<div className="checkdates">
					<label>Check-out</label>
					<input
						type="date"
						value={checkoutDate}
						required
						onChange={setCheckoutFunc}
					/>
				</div>

				<button className="btn" id="reserve-btn" type="submit">
					Reserve
				</button>
			</form>
			<p id="no-charge-yet">You won't be charged yet</p>
			<div id="charter-invoice">
				<div className="invoice-row" id="base-cost">
					<p className="invoice-left">
						${estate?.nightly_rate} x {nightStay} nights
					</p>
					<p className="invoice-right">${baseCost}</p>
				</div>
				<div className="invoice-row" id="clean-cost">
					<p className="invoice-left">Cleaning fee</p>
					<p className="invoice-right">${cleanCost}</p>
				</div>
				<div className="invoice-row" id="service-cost">
					<p className="invoice-left">Service Fee</p>
					<p className="invoice-right">${servCost}</p>
				</div>
				<div className="invoice-row" id="total-cost">
					<p className="invoice-left">
						${estate?.nightly_rate} x {nightStay} nights
					</p>
					<p className="invoice-right">${totalCost}</p>
				</div>
			</div>
		</div>
	);
};

export default CharterForm;
