import {DateRangePicker} from "react-date-range"
import {useState, useEffect} from "react"
import { addDays } from 'date-fns';
import {useDispatch, useSelector} from "react-redux"
import {editCharter} from "../../../../store/charter"
import {dateParser} from "../../../../utils/dateParser"
import {dateArrayCreator} from "../../../../utils/dateArrayCreator"

const EditForm = ({currCharter, setShowEditModal}) => {

  let ciDate = new Date(currCharter.start_date.replace('GMT', ''));
  let coDate = new Date(currCharter.end_date.replace('GMT', ''))
  let today = new Date()

  const dispatch = useDispatch()
  const [checkinDate, setCheckinDate] = useState(ciDate)
  const [checkoutDate, setCheckoutDate] = useState(coDate)
  const [guestNum, setGuestNum] = useState(currCharter.guest_num)
  const allCharters = useSelector(state => Object.values(state.charters))
  const allChartersForEstate = allCharters?.filter(charter => charter.estate_id === currCharter.estate_id && charter.id != currCharter.id)
  const [dateBeforeToday, setDateBeforeToday] = useState(false);


  let disabledDatesArray = []

	allChartersForEstate?.forEach(charter => {
		(dateArrayCreator(addDays(new Date (charter?.start_date), 1), addDays(new Date (charter.end_date), 1))).forEach(date => {
			disabledDatesArray.push(date)
		})
	})


  const [dateRange, setDateRange] = useState([
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

  const handleEdit = (e) => {
    e.preventDefault()
    console.log('------------handleEdit');
    const payload = {id:currCharter.id, userId:currCharter.user_id, estateId:currCharter.estate_id, guestNum: guestNum, startDate: dateParser(checkinDate), endDate: dateParser(checkoutDate)}
    dispatch(editCharter(payload))
    console.log(payload)
    setShowEditModal(false)
  }

  const handleGuestNum = (e) => {
    setGuestNum(e.target.value)
  }

  useEffect(() => {
		setCheckinDate(dateRange[0].startDate)
		setCheckoutDate(dateRange[0].endDate)
	}, [dateRange])

    useEffect(() => {
		const today = new Date();
		const compare = new Date(today.getTime() - 1000);

		if (checkinDate < compare) {
			setDateBeforeToday(true);
		} else {
			setDateBeforeToday(false);
		}
	}, [checkinDate]);


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
					/>
				</div>
				<div>
					<label>New number of guests:</label>
					<input
						type="number"
						placeholder={`${guestNum}`}
						onChange={handleGuestNum}
						min="1" 
						max="10"
					/>
				</div>
				<button
					className="btn-request"
					disabled={dateBeforeToday}
					onClick={handleEdit}
				>
					Request
				</button>
				{dateBeforeToday && (
					<p className="edit-date-error">
						Cannot request a charter change for today's date, or any
						date in the past.
					</p>
				)}
			</form>
		</>
  );
}

export default EditForm
