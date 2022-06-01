import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteForm from "./DeleteForm/DeleteForm";
import EditForm from "./EditForm/EditForm";
import { Modal } from "../../../context/Modal";

const CharterRow = ({ charter, estateId }) => {
  // console.log(typeof charter.start_date)

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dateConverter = (string) => {
    let date = new Date(string);
    date.toString().split(" ");
    return date.toLocaleString().split(",")[0];
  };

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const lengthOfCharter =
    (Date.parse(charter.end_date) - Date.parse(charter.start_date)) /
    (60 * 60 * 24 * 1000);

  const handleModify = () => {
    setShowEditModal(true);
  };

  const handleDispose = () => {
    setShowDeleteModal(true);
  };

  const estates = useSelector((state) => Object.values(state.estates));
  const estate = estates.find((estate) => estate.id === estateId);
  return (
    <>
      <div className="estate-rows" id={`estate-row-${estate?.id}`}>
        <div className="row-left" id="estate-display">
          <a href={`/estates/${estate?.id}`}>
            <img
              src={estate?.images[0].url}
              alt={`main-estate-${estate?.id}`}
            />
          </a>
          <div className="row-buttons">
            <button onClick={handleModify} className="btn">
              Modify
            </button>
            <button onClick={handleDispose} className="btn-cancel">
              Dispose
            </button>
          </div>
        </div>
        <div className="home-row-text">
          <Link to={`/users/${charter.user_id}/my-charters/${charter.id}`}>
            <h2>
              {dateConverter(charter.start_date)} -
              {dateConverter(charter.end_date)}
            </h2>
          </Link>
          <div className="row-title">{estate?.title}</div>
          <div className="row-address">{estate?.address}</div>
          <div className="row-description">{estate?.description}</div>
          <div className="row-cost">
            ${estate?.nightly_rate} <span className="per-night">per night</span>{" "}
            <br></br>
            {lengthOfCharter} <span className="per-night">nights</span>
            <br></br>{" "}
            {moneyFormatter.format(estate?.nightly_rate * lengthOfCharter)}{" "}
            <span className="per-night">total cost</span>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditForm charter={charter}/>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteForm charter={charter} />
        </Modal>
      )}
    </>
  );
};

export default CharterRow;
