import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addOneCharter } from "../../../store/charter";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import "./CharterPage.css";
import { Modal } from "../../../context/Modal";
import EditFormTwo from "./EditModalTwo";
import { set } from "date-fns/esm";
import RatingDisplay from "../../estate/RatingDisplay";
import moneyFormatter from "../../../utils/currency"

import { addDays } from 'date-fns';
// import { ratingEmoji } from "../../estate/StarRating";

const CharterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estates = useSelector((state) => Object.values(state.estates));
  const [user_id, setSessionUserId] = useState("");
  const [estate_id, setEstateId] = useState("");
  const [guest_num, setGuestNum] = useState();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const sessionUser = useSelector((state) => Object.values(state.session));
  const [errorMessages, setErrorMessages] = useState({});
  const [showThankYouModal, setShowThankYouModal] = useState();
  const [showEditModal, setShowEditModal] = useState(false)
  const [showGuestEdit, setShowGuestEdit] = useState(false)
  const ratingEmoji =  "💎";

  // const [searchParams, setSearchParams] = useSearchParams()




  const lengthOfCharter =
  (Date.parse(end_date) - Date.parse(start_date)) / (60 * 60 * 24 * 1000);

  const charterEstate = estates?.find(
    (estate) => parseInt(estate_id) === estate.id
    );

    const charter = {user_id, estate_id, guest_num, start_date, end_date}

    const estate = estates.estate_id;

		// console.log(estate, 'here')
    let dispImg;
    if (charterEstate?.images.length) {
      dispImg = charterEstate?.images.reduce((img, accum) =>
      img.created_at > accum.created_at ? img : accum
      );
    }
    const dispImgURL = dispImg ? dispImg.url : null;

  // console.log(charter)

  const serviceFees = charterEstate?.nightly_rate * lengthOfCharter * 0.30
  const cleaningFees = charterEstate?.nightly_rate * lengthOfCharter * 0.15
  const { search } = useLocation();
  // const params = new URLSearchParams(search)


  const totalCost = (serviceFees, cleaningFees) => {
    const total =
      serviceFees +
      cleaningFees +
      charterEstate?.nightly_rate * lengthOfCharter;
    return moneyFormatter.format(total);
  };

  const handleBackButton = (e) => {
    return history.goBack();
  };

  const handleConfirm = async (e) => {
    const payload = { user_id, estate_id, guest_num, start_date, end_date };
    console.log(payload)
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
    //   const payload = { user_id, estate_id, guest_num, start_date, end_date };
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
      if (keyVal.split("=")[0] === "?user_id") {
        setSessionUserId(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "estate_id") {
        setEstateId(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "guest_num") {
        setGuestNum(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "start_date") {
        setStartDate(keyVal.split("=")[1]);
      }
      if (keyVal.split("=")[0] === "end_date") {
        setEndDate(keyVal.split("=")[1]);
      }
    });
  }, []);

console.log(dispImg, '=============')

  return (
		<>
			<div className="charter-container">
				<div className="confirm-back-button">
					<button onClick={handleBackButton}>
						<i class="fas fa-arrow-left fa-xl"></i>
					</button>
					<h1>Confirm and pay</h1>
				</div>
				<div className="charter-boxes">
					<div className="left-charter-box">
						<div className="charter-details">
							<h2>Your trip</h2>
							<div className="charter-dates">
								<h3>Dates</h3>
								<p>
									{addDays(new Date(start_date), 1)
										.toDateString()
										.split(" ")
										.splice(1)
										.join(" ")}{" "}
									-{" "}
									{addDays(new Date(end_date), 1)
										.toDateString()
										.split(" ")
										.splice(1)
										.join(" ")}
								</p>
								<button
									className="btn"
									onClick={() => setShowEditModal(true)}
								>
									Edit your dates
								</button>
							</div>
							<div className="charter-guests">
								<h3>Guests</h3>
								<p>{guest_num} guest(s)</p>
							</div>
						</div>
						<button className="btn" onClick={handleConfirm}>
							Confirm charter
						</button>
						{errorMessages && (
							<ErrorMessage message={errorMessages[0]} />
						)}
					</div>
					<div className="right-charter-box">
						<div className="charter-img-box">
							{/* <img src={charterEstate?.images[0]?.url}></img> */}
							{dispImgURL ? (
								<img
									src={dispImgURL}
									alt={`main-estate-${estate?.id}`}
								/>
							) : (
								<p className="no-img small">No Images!</p>
							)}
							<div className="charter-title-rating">
								<p>{charterEstate?.type}</p>
								<h4>{charterEstate?.title}</h4>
								<div id="confirm-charter-rating">
									<RatingDisplay
										rating={charterEstate?.rating}
										places={2}
									></RatingDisplay>
								</div>
							</div>
						</div>
						<div>
							<h3>Price details</h3>
							<div className="charter-nightly-cost">
								<p>
									{moneyFormatter.format(charterEstate?.nightly_rate)} x{" "}
									{lengthOfCharter} nights
								</p>
								<p>

									{moneyFormatter.format(charterEstate?.nightly_rate *
										lengthOfCharter)}
								</p>
							</div>
							<div className="charter-fees">
								<p>Cleaning fee</p>
								<p>{moneyFormatter.format(cleaningFees)}</p>
							</div>
							<div className="charter-fees">
								<p>Service fee</p>
								<p>{moneyFormatter.format(serviceFees)}</p>
							</div>
							<div className="charter-total">
								<p>Total(USD)</p>
								<p>

									{totalCost(
										cleaningFees,
										serviceFees
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showThankYouModal && (
				<Modal
					onClose={() =>
						history.push(
							`/users/${sessionUser[0]?.id}/my-charters/`
						)
					}
				>
					<div className="thank-you-modal">
						<h1>You have great taste...</h1>
						<p>Your charter has been confirmed.</p>
					</div>
				</Modal>
			)}
			{showEditModal && (
				<Modal onClose={() => setShowEditModal(false)}>
					<EditFormTwo
						currCharter={charter}
						setShowEditModal={setShowEditModal}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
						endDate={end_date}
						startDate={start_date}
					/>
				</Modal>
			)}
		</>
  );
};

export default CharterPage;
