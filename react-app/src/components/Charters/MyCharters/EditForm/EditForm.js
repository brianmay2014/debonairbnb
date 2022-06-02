import {DateRangePicker} from "react-date-range"
import {useState, useEffect} from "react"
import { addDays } from 'date-fns';
import {useDispatch, useSelector} from "react-redux"
import {editCharter} from "../../../../store/charter"
import {dateParser} from "../../../../utils/dateParser"

const EditForm = ({charter}) => {
console.log(charter.start_date, '========= start date')
  let ciDate = new Date(charter.start_date.replace('GMT', ''));
  let coDate = new Date(charter.end_date.replace('GMT', ''))
  let today = new Date()

  const dispatch = useDispatch()
  const [checkinDate, setCheckinDate] = useState(ciDate)
  const [checkoutDate, setCheckoutDate] = useState(coDate)
  const [guestNum, setGuestNum] = useState(charter.guest_num)
  const allCharters = useSelector(state => {Object.values(state.charters)})
  const allChartersForEstate = allCharters?.filter(charter => charter.estate_id === charter.estate_id)


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
    console.log(checkinDate, "DATE BEFORE PARSER")
    console.log(dateParser(checkinDate), "DATE PARSERR")
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
        disabledDates={[today, addDays(today, 2)]}
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
