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
    <>
      <form method="PATCH">
        <h3>Are you sure you want to dispose of your charter?</h3>
        <button onClick={handleDelete}>Yes, delete my charter</button>
        <button onClick={() => setShowDeleteModal(false)}>
          No, take me back to my charters
        </button>
      </form>
    </>
  );
};

export default DeleteForm;
