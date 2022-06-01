import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import EditForm from "../MyCharters/EditForm/EditForm";
import DeleteForm from "../MyCharters/DeleteForm/DeleteForm";
import "./SingleCharterPage.css"

const SingleCharterPage = () => {
  const { id } = useParams();
  const charterId = id;
  const allEstates = useSelector((state) => Object.values(state.estates));
  const allCharters = useSelector((state) => Object.values(state.charters));
  const singleCharter = allCharters.find(
    (charter) => charter.id === parseInt(charterId)
  );
  // console.log(singleCharter)
  const charterEstate = allEstates.find(
    (estate) => estate.id === singleCharter.estate_id
  );

  return (
    <div>
        <h1>Charter Details</h1>
      <div className="single-charter-img">
        <img src={charterEstate?.images[0].url}></img>
      </div>
    </div>
  );
};

export default SingleCharterPage;
