import { DateRangePicker } from "react-date-range";
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../../../utils/dateParser";
import { dateArrayCreator } from "../../../utils/dateArrayCreator";
import "./EditModalTwo.css";

const EditFormTwo = ({
  currCharter,
  setShowEditModal,
  setStartDate,
  setEndDate,
  start_date,
  end_date,
}) => {
  // console.log(typeof currCharter.start_date, '===================')
  let ciDate = new Date(currCharter.start_date.replace("GMT", ""));
  let coDate = new Date(currCharter.end_date.replace("GMT", ""));
  let today = new Date();

  const dispatch = useDispatch();
  const [checkinDate, setCheckinDate] = useState(ciDate);
  const [checkoutDate, setCheckoutDate] = useState(coDate);
  const [guestNum, setGuestNum] = useState(currCharter.guest_num);
  const allCharters = useSelector((state) => Object.values(state.charters));
  const allChartersForEstate = allCharters?.filter(
    (charter) =>
      charter.estate_id === parseInt(currCharter.estate_id) &&
      charter.id !== parseInt(currCharter.id)
  );

  // console.log(allChartersForEstate);

  let disabledDatesArray = [];

  allChartersForEstate?.forEach((charter) => {
    dateArrayCreator(
      addDays(new Date(charter?.start_date), 1),
      addDays(new Date(charter.end_date), 1)
    ).forEach((date) => {
      disabledDatesArray.push(date);
    });
  });

  const [dateRange, setDateRange] = useState([
    {
      // startDate: new Date(),
      // endDate: addDays(new Date(), 7),
      // key: "selection",
      startDate: addDays(checkinDate, 1),
      endDate: addDays(checkoutDate, 1),
      key: "selection",
      color: "#c28849",
    },
  ]);

  // console.log(typeof dateRange[0].startDate)

  const handleEdit = (e) => {
    e.preventDefault();

    setStartDate(dateParser(dateRange[0].startDate));
    setEndDate(dateParser(dateRange[0].endDate));
    setShowEditModal(false);
  };

  useEffect(() => {
    setCheckinDate(dateRange[0].startDate);
    setCheckoutDate(dateRange[0].endDate);
  }, [dateRange]);

  return (
    <>
      <form method="PATCH">
        <div>
          <h3>Please submit your edit request</h3>
        </div>
        <div id="avail-cal">
          <DateRangePicker
            onChange={(item) => setDateRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
            disabledDates={disabledDatesArray}
            minDate={new Date()}
          />
        </div>
        <div className="btn-div">
          <button className="btn" onClick={handleEdit}>
            Request
          </button>
        </div>
      </form>
    </>
  );
};

export default EditFormTwo;
