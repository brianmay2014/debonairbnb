import "./MyCharters.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { genCharters } from "../../store/charter";

const MyCharters = () => {
  const dispatch = useDispatch();
  const charters = useSelector((state) => Object.values(state?.charters));
  const sessionUser = useSelector((state) => Object.values(state.session));

  const yourCharters = charters.filter(
    (charter) => charter.userId === sessionUser.user?.id
  );

  return (
    <>
      {yourCharters.map((charter) => {
        return (
          <div>
            <h1>
              {charter.start_date} to {charter.end_date}
            </h1>
            {/* <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button> */}
          </div>
        );
      })}
    </>
  );
};

export default MyCharters;
