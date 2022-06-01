import {DateRangePicker} from "react-date-range"
import {useState, useEffect} from "react"
import { addDays } from 'date-fns';
import {useDispatch} from "react-redux"
import {editCharter} from "../../../../store/charter"
import {dateParser} from "../../../../utils/dateParser"

const EditForm = ({charter}) => {

  let ciDate = new Date(charter.start_date);
  let coDate = new Date(charter.end_date)

  const dispatch = useDispatch()
  const [checkinDate, setCheckinDate] = useState(ciDate)
  const [checkoutDate, setCheckoutDate] = useState(coDate)
  const [guestNum, setGuestNum] = useState(charter.guest_num)


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
    const payload = {id:charter.id, userId:charter.user_id, estateId:charter.estate_id, guestNum: guestNum, startDate: dateParser(checkinDate), endDate: dateParser(checkoutDate)}
    dispatch(editCharter(payload))
  }

  const handleGuestNum = (e) => {
    setGuestNum(e.target.value)
  }

  useEffect(() => {
		// console.log(state);
		// console.log(typeof state[0].endDate);
		setCheckinDate(dateRange[0].startDate)
		setCheckoutDate(dateRange[0].endDate)
	}, [dateRange])



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
			/>
		</div>
    <div>
      <label>New number of guests:</label>
      <input type="number" placeholder={`${guestNum}`} onChange={handleGuestNum}/>
    </div>
    <button onClick={handleEdit}>Request</button>
    </form>
    </>
  )
}

export default EditForm
