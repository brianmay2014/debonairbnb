import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addOneCharter } from "../../../store/charter";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import "./CharterPage.css";
import { Modal } from "../../../context/Modal";

const CharterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estates = useSelector((state) => Object.values(state.estates));
  const [sessionUserId, setSessionUserId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [guestNum, setGuestNum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sessionUser = useSelector((state) => Object.values(state.session));
  const [errorMessages, setErrorMessages] = useState({});
  const [showThankYouModal, setShowThankYouModal] = useState();

  // const [searchParams, setSearchParams] = useSearchParams()

  const lengthOfCharter =
    (Date.parse(endDate) - Date.parse(startDate)) / (60 * 60 * 24 * 1000);

  const charterEstate = estates?.find(
    (estate) => parseInt(estateId) === estate.id
  );



  const serviceFees = charterEstate?.nightly_rate * lengthOfCharter * 0.1;
  const occupancyFees = charterEstate?.nightly_rate * lengthOfCharter * 0.09;
  const cleaningFees = charterEstate?.nightly_rate * lengthOfCharter * 0.08;
  const { search } = useLocation();
  // const params = new URLSearchParams(search)

  const totalCost = (serviceFees, occupancyFees, cleaningFees) => {
    const total =
      serviceFees +
      occupancyFees +
      cleaningFees +
      charterEstate?.nightly_rate * lengthOfCharter;
    return total;
  };

  const handleBackButton = (e) => {
    return history.goBack();
  };

  const handleConfirm = async (e) => {
    const payload = { sessionUserId, estateId, guestNum, startDate, endDate };
    let createdCharter;
    try {
      createdCharter = await dispatch(addOneCharter(payload));
      if (createdCharter) {
        // history.push("/")
        setShowThankYouModal(true);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessages(error.errors);
        console.log(error.errors);
      }
    }
  };



  useEffect(async () => {
    // const handleConfirm = async (e) => {
    //   const payload = { sessionUserId, estateId, guestNum, startDate, endDate };
    //   let createdCharter;
    //   try {
    //     createdCharter = await dispatch(addOneCharter(payload));
    //   } catch (error) {
    //     if (error instanceof ValidationError) {
    //       setErrorMessages(error.errors);
    //       console.log(error.errors);
    //     }
    //   }
    // };
    setErrorMessages(null);
  }, []);

  const queryParamsArray = search.split("&");
  let newParams = [];
  queryParamsArray.map((keyVal) => {
    newParams.push(keyVal.toString());
  });

  useEffect(() => {
    const newestParams = newParams.forEach((keyVal) => {
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
  }, []);

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
            {errorMessages && (
              <ErrorMessage label={"Invalid dates"} message={errorMessages} />
            )}
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
      {showThankYouModal && (
        <Modal onClose={() => history.push(`/users/${sessionUser[0]?.id}/my-charters/`)}>
          <h1>You have great taste...</h1>
          <p>Your charter has been confirmed.</p>
        </Modal>
      )}
    </>
  );
};

export default CharterPage;
