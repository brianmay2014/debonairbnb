import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import "./SearchDurationInput.css";
import { useSelector, useDispatch } from "react-redux";

const SearchDurationInput = ({setCheckoutDate, setCheckinDate, checkoutDate, checkinDate, setShowDateRange, showDateRange}) => {



  const today = new Date();

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

  const [state, setState] = useState([
    {
      // startDate: new Date(),
      // endDate: addDays(new Date(), 7),
      // key: "selection",
      startDate: today,
      endDate: addDays(today, 1),
      key: "selection",
      color: "#c28849",
    },
  ]);

  const setCheckoutFunc = async (e) => {
    let strDate = e.target.value;

    let newDate = new Date(strDate);
    let setDate = addDays(newDate, 1);
    setCheckoutDate(setDate);
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

  useEffect(() => {
    const unHideCalendar = () => {
      setShowDateRange(false);
    };

    document.addEventListener("click", unHideCalendar);
    return () => document.removeEventListener("click", unHideCalendar);
  }, [showDateRange]);


  useEffect(() => {
		setCheckinDate(state[0].startDate)
		setCheckoutDate(state[0].endDate)
		// console.log(disabledDatesArray)
	}, [state])


  const closeCal = async (e) => {
    e.preventDefault();
    setShowDateRange(false);
  }

  return (
		<div className="checkin-checkout-inputs">
			<div className="checkdates-2">
				<label>Check-in</label>
				<input
					type="date"
					// value={checkinDate}
					value={dateParser(checkinDate)}
					required
					readonly="readonly"
					onChange={setCheckinFunc}
					onClick={() => setShowDateRange(true)}
				/>
			</div>
			<div className="checkdates-2">
				<label>Check-out</label>
				<input
					type="date"
					readonly="readonly"
					value={dateParser(checkoutDate)}
					required
					onChange={setCheckoutFunc}
					onClick={() => setShowDateRange(true)}
				/>
			</div>
			{showDateRange && (
				<div className="search-date-range">
					<DateRangePicker
						onChange={(item) => setState([item.selection])}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						months={2}
						ranges={state}
						direction="horizontal"
						dragSelectionEnabled={true}
					/>
					<button className="btn" id="selected-dates-button" onClick={closeCal}>
						Use Selected Dates
					</button>
				</div>
			)}
		</div>
  );
};

export default SearchDurationInput;
