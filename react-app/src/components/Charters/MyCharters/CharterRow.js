import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteForm from "./DeleteForm/DeleteForm";
import EditForm from "./EditForm/EditForm";
import { Modal } from "../../../context/Modal";
import { addDays } from "date-fns";
import "./CharterRow.css";

const CharterRow = ({ charter, estateId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dateConverter = (string) => {
    let date = new Date(string);

    return addDays(date, 1).toLocaleString().split(",")[0];
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

  let dispImg;
  if (estate?.images.length) {
    dispImg = estate?.images.reduce((img, accum) =>
      img.created_at > accum.created_at ? img : accum
    );
  }

  const dispImgURL = dispImg ? dispImg.url : null;

  return (
    <>
      <div className="estate-rows" id={`estate-row-${estate?.id}`}>
        <div className="row-left" id="estate-display">
          <a href={`/estates/${estate?.id}`}>
            {/* <img
							src={estate?.images[0]?.url}
							alt={`main-estate-${estate?.id}`}
						/> */}
            {dispImgURL ? (
              <img src={dispImgURL} alt={`main-estate-${estate?.id}`} />
            ) : (
              <p className="no-img small">No Images!</p>
            )}
          </a>
          <div className="row-buttons">
            <button onClick={handleModify} className="btn">
              Modify Charter
            </button>
            <button onClick={handleDispose} className="btn-cancel">
              Dispose Charter
            </button>
          </div>
        </div>
        <div className="home-row-text">
          <div className="charter-row-title">
            <h3>
              {dateConverter(charter.start_date)} -
              {" " + dateConverter(charter.end_date)}
            </h3>
            <p>
              Reserved on {new Date(charter?.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="row-title">{estate?.title}</div>
          <div className="row-address">{estate?.address}</div>
          {/* <div className="row-description">{estate?.description}</div> */}
          <div className="row-cost">
            <div>
              {charter.guest_num} <span className="per-night">guest(s)</span>{" "}
            </div>
            <div>
              {moneyFormatter.format(estate?.nightly_rate)}{" "}
              <span className="per-night">per night</span>{" "}
            </div>
            <div>
              {lengthOfCharter} <span className="per-night">nights</span>
            </div>
            <div>
              {moneyFormatter.format(estate?.nightly_rate * lengthOfCharter)}{" "}
              <span className="per-night">total cost</span>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditForm currCharter={charter} setShowEditModal={setShowEditModal} />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteForm
            charter={charter}
            setShowDeleteModal={setShowDeleteModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CharterRow;
