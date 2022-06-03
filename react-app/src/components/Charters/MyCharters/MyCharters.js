import "./MyCharters.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../../context/Modal";
import EditForm from "./EditForm/EditForm";
import CharterRow from "./CharterRow";

const MyCharters = () => {
  const dispatch = useDispatch();
  const charters = useSelector((state) => Object.values(state?.charters));
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const yourCharters = charters.filter(
    (charter) => charter.user_id === parseInt(id)
  );

  // const [showCharterModal, setShowCharterModal] = useState(false);

  return (
    <div className="my-charters-container">
      <h1>My Charters</h1>
      {yourCharters.map((charter) => {
        return (
          <div>
            <CharterRow charter={charter} estateId={charter.estate_id} />
          </div>
        );
      })}
    </div>
  );
};

export default MyCharters;
