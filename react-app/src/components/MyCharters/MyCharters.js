import "./MyCharters.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { Modal } from "../../context/Modal";
import EditForm from "./EditForm/EditForm";

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
    <>
      {yourCharters.map((charter) => {
        return (
          <div>
            <h1>
          <Link to={`/${id}/my-charters/${charter.id}`}>
              {charter.start_date} to {charter.end_date}
          </Link>
            </h1>
            {/* <button onClick={() => setShowCharterModal(true)}>Edit</button>
            {showCharterModal && (
              <Modal onClose={() => setShowCharterModal(false)}>
                <CharterModal />
              </Modal>
            )} */}
          </div>
        );
      })}
    </>
  );
};

export default MyCharters;
