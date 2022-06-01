import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addOneCharter } from "../../store/charter";
import "./CharterPage.css";

const CharterPage = ({ setCharterPayload, charterPayload }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estates = useSelector((state) => Object.values(state.estates));
  const [sessionUserId, setSessionUserId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [guestNum, setGuestNum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(useSearchParams())

  const lengthOfCharter =
    (Date.parse(endDate) -
      Date.parse(startDate)) /
    (60 * 60 * 24 * 1000);



  const charterEstate = estates?.find(
    (estate) => parseInt(estateId) === estate.id
  );

  console.log(estateId, '============')

  const serviceFees = charterEstate?.nightly_rate * lengthOfCharter * 0.1;
  const occupancyFees = charterEstate?.nightly_rate * lengthOfCharter * 0.09;
  const cleaningFees = charterEstate?.nightly_rate * lengthOfCharter * 0.08;
  const { search } = useLocation();

  const totalCost = (serviceFees, occupancyFees, cleaningFees) => {
    const total =
      serviceFees +
      occupancyFees +
      cleaningFees +
      charterEstate?.nightly_rate * lengthOfCharter;
    return total;
  };



  //  const newParams = search.split('&')

  //  const newestParams = newParams.forEach(keyVal => {
  //    if (keyVal[0] === '?sessionUserId') {
  //      setSessionUserId(keyVal[1])
  //     }
  //     if (keyVal[0] === 'estateId') {
  //       setEstateId(keyVal[1])
  //     }
  //     if (keyVal[0] === 'guestNum') {
  //       setGuestNum(keyVal[1])
  //     }
  //     if (keyVal[0] === 'startDate') {
  //       setStartDate(keyVal[1])
  //     }
  //     if (keyVal[0] === 'endDate') {
  //       setEndDate(keyVal[1])
  //     }
  //     return keyVal
  //   })

  //   console.log(newestParams, "=============== AHHHH")

  const handleBackButton = (e) => {
    return history.goBack();
  };

  const handleConfirm = (e) => {
    dispatch(addOneCharter(charterPayload));
  };

  const queryParamsArray = search.split("&");
  let newParams = [];
  queryParamsArray.map((keyVal) => {
    newParams.push(keyVal.toString());
  });





  useEffect(()=> {
    const newestParams = newParams.forEach((keyVal) => {
      console.log(keyVal.split("="));
      if (keyVal.split("=")[0] === "?sessionUserId") {
        setSessionUserId(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "estateId") {
        setEstateId(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "guestNum") {
        setGuestNum(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "startDate") {
        setStartDate(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "endDate") {
        setEndDate(keyVal.split("=")[1]);
      }
    });
  },[])

  return (
    <>
      <div className="charter-container">
        <div className="confirm-back-button">
          <button onClick={handleBackButton}>Back</button>
          <h1>Confirm and pay</h1>
        </div>
        <div className="charter-boxes">
          <div className="left-charter-box">
            <div className="charter-details">
              <h2>Your trip</h2>
              <div className="charter-dates">
                <h3>Dates</h3>
                <button>Edit</button>
                <p>
                  {startDate} - {endDate}
                </p>
              </div>
              <div className="charter-guests">
                <h3>Guests</h3>
                <p>{guestNum} guest(s)</p>
                <button>Edit</button>
              </div>
            </div>
            <button onClick={handleConfirm}>Confirm charter</button>
          </div>
          <div className="right-charter-box">
            <div className="charter-img-box">
              <img src={charterEstate?.images[0].url}></img>
              <div>
                <p>{charterEstate?.title}</p>
                <p>Rating: {charterEstate?.rating}</p>
              </div>
            </div>
            <div>
              <h3>Price details</h3>
              <div className="charter-nightly-cost">
                <p>
                  ${charterEstate?.nightly_rate} x {lengthOfCharter} nights
                </p>
                <p>${charterEstate?.nightly_rate * lengthOfCharter}</p>
              </div>
              <div>
                <p>Cleaning fee</p>
                <p>${cleaningFees.toFixed(2)}</p>
              </div>
              <div>
                <p>Service fee</p>
                <p>${serviceFees.toFixed(2)}</p>
              </div>
              <div>
                <p>Occupancy taxes and fees</p>
                <p>${occupancyFees.toFixed(2)}</p>
              </div>
              <div>
                <p>Total(USD)</p>
                <p>
                  $
                  {totalCost(cleaningFees, serviceFees, occupancyFees).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharterPage;
