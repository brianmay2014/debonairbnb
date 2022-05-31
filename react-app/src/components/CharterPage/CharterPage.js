import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOneCharter } from "../../store/charter";
import "./CharterPage.css";

const CharterPage = ({ charterPayload }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estates = useSelector((state) => Object.values(state.estates));
  const charterEstate = estates.find(
    (estate) => charterPayload?.estateId === estate.id
  );

  const lengthOfCharter =
    (Date.parse(charterPayload?.endDate) -
      Date.parse(charterPayload?.startDate)) /
    (60 * 60 * 24 * 1000);

  console.log();
  const handleBackButton = (e) => {
    return history.goBack();
  };

  const handleConfirm = (e) => {
    dispatch(addOneCharter(charterPayload));
  };

  return (
    <div className="charter-container">
      <div className="left-charter-box">
        <div className="confirm-back-button">
          <button onClick={handleBackButton}>Back</button>
          <h1>Confirm and pay</h1>
        </div>
        <div className="charter-details">
          <h2>Your trip</h2>
          <div className="charter-dates">
            <h3>Dates</h3>
            <button>Edit</button>
            <p>
              {charterPayload?.startDate} - {charterPayload?.endDate}
            </p>
          </div>
          <div className="charter-guests">
            <h3>Guests</h3>
            <p>{charterPayload?.guestNum} guest(s)</p>
            <button>Edit</button>
          </div>
        </div>
        <button onClick={handleConfirm}>Confirm charter</button>
      </div>
      <div className="right-charter-box">
        <div>
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

        </div>
      </div>
    </div>
  );
};

export default CharterPage;
