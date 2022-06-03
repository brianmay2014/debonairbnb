import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteCharter, genCharters } from "../../../../store/charter";

const DeleteForm = ({ charter, setShowDeleteModal }) => {
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCharter(charter)).then(setShowDeleteModal(false));
  };
  // useEffect(() => {
  //   dispatch(genCharters())
  // }, [dispatch]);

  return (
    <div className="delete-form-container">
      <form method="PATCH">
        <h3>Are you sure you want to dispose of your charter?</h3>
        <div className="button-delete-form">
          <button className="btn" onClick={handleDelete}>
            Yes, banish my charter
          </button>
          <button className="btn" onClick={() => setShowDeleteModal(false)}>
            No, escort me back
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteForm;
