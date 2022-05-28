import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editEstate } from "../../store/estate";

const UploadImage = ({ estate }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    const updateEstate = await dispatch(editEstate(estate, {image})).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    if (updateEstate && errors.length === 0) {
      setLoading(false);
      return updateEstate;
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={updateImage} />
      <button type="submit">Submit</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default UploadImage;
