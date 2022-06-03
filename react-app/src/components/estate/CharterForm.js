import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  Route,
  Redirect,
  useParams,
  useHistory,
  Switch,
} from "react-router-dom";
import "./estatePage.css";
import { getCheckinDate, getCheckoutDate, getNightStay } from "./utils";
import { addDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { dateArrayCreator } from "../../utils/dateArrayCreator";

const CharterForm = ({ estate, stateVars, setCharterPayload }) => {
  const params = useParams();
  const estateId = parseInt(params.id);
  const history = useHistory();
  const dispatch = useDispatch();
  // const [checkinDate, setCheckinDate] = useState(getCheckinDate());
  // const [checkoutDate, setCheckoutDate] = useState(getCheckoutDate());
  // const [nightStay, setNightStay] = useState(getNightStay());

  //cleaning rate, can set up fancy randomizer, or just leave it as 15% of one night's stay
  const cleanRate = 0.15;

  // const user = useSelector((state) => state.session.user);

  let {
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    nightStay,
    setNightStay,
  } = stateVars;

  const [guestNum, setGuestNum] = useState(1);
  const [dateValid, setDateValid] = useState(true);
  const [dateBeforeToday, setDateBeforeToday] = useState(false);
  const sessionUserId = useSelector((state) => state.session.user?.id);
  const [dateRangeValid, setDateRangeValid] = useState(true);
  
  
  const dateParser = (dateobj) => {
    let year = dateobj.getFullYear();
    let month = dateobj.getMonth() + 1;
    let day = dateobj.getDate();
  
    if (month < 10) {
      month = `0${month.toString()}`;
    }
    if (day < 10) {
      day = `0${day.toString()}`;
    }
  
    return `${year}-${month.toString()}-${day.toString()}`;
  };

  const charters = useSelector((state) => Object.values(state.charters));

	const estateCharters = charters?.filter(
		(charter) => estate?.id === charter.estate_id
	);

	let disabledDatesArray = [];

	estateCharters?.forEach((charter) => {
		dateArrayCreator(
			addDays(new Date(charter?.start_date), 1),
			addDays(new Date(charter.end_date), 1)
		).forEach((date) => {
			disabledDatesArray.push(dateParser(date));
		});
	});


  useEffect(() => {

    setNightStay(getNightStay(checkinDate, checkoutDate));
  }, [checkinDate, checkoutDate, nightStay]);

  useEffect(() => {
		console.log("check in date", checkinDate);
    console.log("check out date", checkoutDate);
    console.log("check in < out - set to true", checkinDate < checkoutDate);

		if (checkinDate < checkoutDate) {
			setDateValid(true);
		} else {
			setDateValid(false);
		}
  }, [checkinDate, checkoutDate])

    useEffect(() => {
      const today = new Date()
      const compare = new Date(today.getTime() - 1000);

		if (checkinDate < compare) {
			setDateBeforeToday(true);
    } else {
			setDateBeforeToday(false);
		}
	}, [checkinDate]);

  useEffect(() => {
    //initial load causes incorrect setting, setting to proper setting after initial render
    //changing dates after initial render are correct
    setDateBeforeToday(false);
  }, [])

  useEffect(() => {
    // console.log(disabledDatesArray)
    // console.log(disabledDatesArray.includes(dateParser(checkinDate)));
    // console.log(disabledDatesArray.includes(dateParser(checkoutDate)));

    const inInvalid = disabledDatesArray.includes(dateParser(checkinDate));
	  const outInvalid = disabledDatesArray.includes(dateParser(checkoutDate));

    if (inInvalid || outInvalid) {
      setDateRangeValid(false);
    } else {
      setDateRangeValid(true);
    }


  }, [checkinDate, checkoutDate, disabledDatesArray])
// disabledDatesArray


useEffect(() => {
	console.log('dateValid', dateValid);
  console.log('dateBeforeToday', dateBeforeToday);
  console.log("dateRangeValid", dateRangeValid);
  console.log(
		"disabled button?",
		!dateValid && dateBeforeToday && !dateRangeValid
  );
  
}, [checkinDate, checkoutDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = dateParser(checkinDate);
    const endDate = dateParser(checkoutDate);

    const payload = {
      sessionUserId,
      estateId,
      guestNum,
      startDate,
      endDate,
    };

    setCharterPayload(payload);
    return history.push(
      `/charters?user_id=${sessionUserId}&estate_id=${estateId}&guest_num=${guestNum}&start_date=${startDate}&end_date=${endDate}`
    );
    // dispatch(addOneCharter(payload))
  };

  const setCheckinFunc = async (e) => {
    let strDate = e.target.value;
    // console.log('-*/-*/-*/-*/-*/-*/-CHECKIN FUNC*/-*/-*/-*/-*/-*/-*/-*/-*/-*/');
    // console.log("strDate", strDate);
    let newDate = new Date(strDate);
    // console.log("newDate", newDate);

    let setDate = addDays(newDate, 1);
    setCheckinDate(setDate);
    // console.log('CHECKIN DATE', checkinDate);
    // console.log("-*/-*/-*/-*/-*/-*/-*CHECKINFUNC/-*/-*/-*/-*/-*/-*/-*/-*/-*/");
    // setCheckinDate(e.target.value)
    // setNightStay(getNightStay(checkinDate, checkoutDate));
  };

  const setCheckoutFunc = async (e) => {
    let strDate = e.target.value;

    let newDate = new Date(strDate);
    let setDate = addDays(newDate, 1);
    setCheckoutDate(setDate);
  };

  const errors = [];

  // const { address, owner_id, title, estate?.nightly_rate, type_id, description } =
  // 	estate;

  const handleGuestNum = (e) => {
    setGuestNum(e.target.value);
  };

  const baseCost = nightStay * estate?.nightly_rate;
  const cleanCost = estate?.nightly_rate * cleanRate;
  const servCost = 0;
  const totalCost = baseCost + cleanCost + servCost;


  return (
		<>
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
							// value={checkinDate}
							value={dateParser(checkinDate)}
							required
							onChange={setCheckinFunc}
						/>
					</div>
					<div className="checkdates">
						<label>Check-out</label>
						<input
							type="date"
							value={dateParser(checkoutDate)}
							required
							onChange={setCheckoutFunc}
						/>
					</div>
					<div className="checkdates">
						<label>Number of guests</label>
						<input
							type="number"
							min="1"
							max="10"
							value={guestNum}
							required
							onChange={handleGuestNum}
						/>
					</div>

					<button
						className="btn"
						id="reserve-btn"
						disabled={!dateValid || dateBeforeToday || !dateRangeValid}
						type="submit"
					>
						Reserve
					</button>
				</form>
				{dateValid && !dateBeforeToday && dateRangeValid && (
					<p id="no-charge-yet">You won't be charged yet</p>
				)}
				{!dateValid && (
					<p className="dates-invalid">
						Check in date must be before check out date
					</p>
				)}
				{dateBeforeToday && (
					<p className="dates-invalid">
						Check in date must be after today
					</p>
				)}
				{!dateRangeValid && (
					<p className="dates-invalid">
						The estate is not available these dates, try again 
					</p>
				)}
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
			<div></div>
		</>
  );
};

export default CharterForm;
