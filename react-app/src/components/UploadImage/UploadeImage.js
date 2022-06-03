import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editEstate } from "../../store/estate";
import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./UploadImage.css";

const UploadImage = ({ estate, onFinish }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [icon, setIcon] = useState(faFileArrowUp)

  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  const typeArea = (
    <span className="fileTypes">
      Accepted Types: {fileTypes.join(", ")}
    </span>
  );

  const dropArea = (
    <div className="dropArea">
      {previewImg ? (
        <img src={previewImg} alt={"img preview"}/>
      ) : (
        <div className={"dropAreaIcon iEmpty"}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <span>Drag & Drop or Click to Select an Image</span>
      {typeArea}
    </div>
  );

  const [dropChild, setDropChild] = useState(dropArea);

  const dropAreaErrored = (
    <div className="dropArea ">
      <div className={"dropAreaIcon iError"}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span className="fileError">
        That file didn't adhere to our dress code.
      </span>
      {typeArea}
    </div>
  );

  useEffect(() => {
    if (previewImg) {
    const dropAreaFilled = (
      <div className="dropArea drop-filled">
        <span>Upload this Image?</span>
        <img src={previewImg} className={"uploadImg"} alt={"image preview"}/>
        <span>Drag & Drop or Click to Change the Image</span>
      </div>);
      setDropChild(dropAreaFilled);
      setErrors([])
    }
  }, [previewImg]);

  useEffect(() => {
    if (image && errors.length === 0) {
      setDisabled(false)
      setIcon(faFileArrowUp)
    } else {
      setDisabled(true)
      setIcon(faFileCircleXmark)
    }
  },[errors, image])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    const updateEstate = await dispatch(editEstate(estate, image)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    if (updateEstate && errors.length === 0) {
      setLoading(false);
      onFinish();
      return updateEstate;
    }
  };

  const updateImage = (file) => {
    const imgURL = URL.createObjectURL(file);
    setPreviewImg(imgURL)
    setImage(file);
  };

  const handleError = () => {
    setDropChild(dropAreaErrored);
    setErrors([...errors, "Incorrect file type"]);
  }
  console.log(image, disabled)
  return (
    <form onSubmit={handleSubmit}>
      <FileUploader
        className="setImg"
        children={[dropChild]}
        onTypeError={handleError}
        handleChange={updateImage}
        name="image"
        types={fileTypes}
      />
      <button className={"btn"} type="submit" disabled={disabled}>Upload</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default UploadImage;
