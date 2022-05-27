import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const UploadImage = ({estate}) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea

    setLoading(true);
    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setLoading(false);
      history.push("/images");
    } else {
      setLoading(false);
      console.log("error");
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

export default UploadImage
