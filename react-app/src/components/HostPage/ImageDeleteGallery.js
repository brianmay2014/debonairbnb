import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../context/Modal";
import { deleteEstateImage } from "../../store/estate";
import { useDispatch } from "react-redux";

const ImgGalleryDeleteModal = ({ estateImage, setShowModal }) => {
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    const deleteConfirm = await dispatch(deleteEstateImage(estateImage));
    if (deleteConfirm) {
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };
  return (
    <div className={"delete-gallery-modal"}>
      <h2>Delete Image?</h2>
      <img src={estateImage.url} />
      <button className="btn" onClick={handleDelete}>
        Confirm Delete?
      </button>
    </div>
  );
};

const ImgWithDelete = ({estateImage}) => {
    const [showModal, setShowModal] = useState(false)

    return (
    <div className={"delete-gallery-img"}>
      <div className={"delete-gallery-control"}>
        <FontAwesomeIcon icon={faTrashCan} onClick={() => setShowModal(true)} />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ImgGalleryDeleteModal estateImage={estateImage} setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
      <img src={estateImage.url} alt={"delete?"}/>
    </div>
    );
}


const ImageDeleteGallery = ({estate}) => {
    const estateImages = estate.images;
    const imgComps = estateImages.map(img => <ImgWithDelete estateImage={img} />);
    return (
        <div className={"delete-gallery"}>
            {imgComps}
        </div>
    );
}

export default ImageDeleteGallery;
