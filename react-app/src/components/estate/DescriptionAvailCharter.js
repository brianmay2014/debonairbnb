import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Redirect, useParams } from "react-router-dom";
import "./estatePage.css";
import CharterForm from "./CharterForm";
import AvailabilityCal from "./AvailabilityCal";
import { getCheckinDate, getCheckoutDate, getNightStay } from "./utils";
import { addDays } from 'date-fns';



const DescriptionAvailCharter = ( {estate, setCharterPayload} ) => {
	// const { id } = useParams();

    let ciDate = new Date();
    let coDate = addDays( new Date(), 7);

    const [checkinDate, setCheckinDate] = useState(ciDate);
    // console.log('-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/');
    // console.log(checkinDate);
    // console.log(typeof checkinDate);
    // console.log("-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/");
    const [checkoutDate, setCheckoutDate] = useState(coDate);
    // let date = new Date()
    // const [checkinDate, setCheckinDate] = useState(new Date());
	// const [checkoutDate, setCheckoutDate] = useState(addDays(new Date(), 7));

    const [nightStay, setNightStay] = useState(getNightStay());

	// const dispatch = useDispatch();

	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);

    let stateVars = {checkinDate, setCheckinDate, checkoutDate, setCheckoutDate, nightStay, setNightStay}


    const ownerName = "Jerrey";
    // const numGuests = 6;
    // const numBaths = 3;
    // const numBeds =  6;


	return (
		<div id="desc-avail-charter">
			<div id="dac-left">
				<div id="description-header">
					{estate?.title} hosted by {ownerName}
				</div>
				<div id="estate-details">
					{/* {numGuests} guests - {numBeds} beds - {numBaths} baths */}
				</div>
				<div id="estate-description">{estate?.description}</div>
				<AvailabilityCal
                estate={estate}
                stateVars={stateVars}
                />
			</div>
			<div id="dac-right">
				<CharterForm
					estate={estate}
					stateVars={stateVars}
					setCharterPayload={setCharterPayload}

				/>
			</div>
		</div>
	);
};

export default DescriptionAvailCharter;
