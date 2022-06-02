import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEstate } from "../../store/estate";
import UploadImage from "../UploadImage/UploadeImage";
import { Modal } from "../../context/Modal";
import { genEstates, editEstate } from '../../store/estate'

const EstateRow = ({ estate }) => {
	const address = `${estate?.city}, ${estate?.state}`;
	const dispImg = estate?.images[0]?.url;
	const estates = useSelector((state) => state.estates);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const submitDelete = async (e) => {
		e.preventDefault();

		const data = await dispatch(deleteEstate(estate));
		// if (data) {
		// 	setErrors(data)
		// }
	};

	// submitEdit

	return (
		<div className="estate-rows" id={`estate-row-${estate?.id}`}>
			<div className="row-left" id="estate-display">
				<a href={`/estates/${estate?.id}`}>
					<img src={dispImg} alt={`main-estate-${estate?.id}`} />
				</a>
				<div className="row-buttons">
					<button className="btn" onClick={() => setShowModal(true)}>
						Modify
					</button>
					{showModal && (
						<Modal onClose={() => setShowModal(false)}>
							<EstateEditModal
								estate={estate}
								setShowModal={setShowModal}
							/>
						</Modal>
					)}
					<button className="btn-cancel" onClick={submitDelete}>
						Dispose
					</button>
				</div>
			</div>
			<div className="home-row-text">
				<div className="row-title">{estate?.title}</div>
				<div className="row-address">{estate?.address}</div>
				<div className="row-description">{estate?.description}</div>
				<div className="row-bottom">
					<div className="estate-row-text">
						${estate?.nightly_rate}{" "}
						<span className="per-night">per night</span>
					</div>
					<div className="upload-image">
						<UploadImage estate={estates[estate?.id]} />
					</div>
				</div>
			</div>
		</div>
	);
};

const EstateEditModal = ({ estate, setShowModal }) => {
	const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});
	const [address, setAddress] = useState(estate.address);
	const [title, setTitle] = useState(estate.title);
	const [nightlyRate, setNightlyRate] = useState(estate.nightly_rate);
	const [type, setType] = useState(estate.type_id);
	const [description, setDescription] = useState(estate.description);
	const [ownerId, setOwnerId] = useState(user.id);

	// const disabled = Object.keys(errors).length > 0;


	const typeList = [
		{ id: 1, name: "Castle" },
		{ id: 2, name: "Chateau" },
		{ id: 3, name: "Country House" },
		{ id: 4, name: "Historic" },
		{ id: 5, name: "Island" },
		{ id: 6, name: "Manor" },
		{ id: 7, name: "Mansion" },
		{ id: 8, name: "Palace" },
		{ id: 9, name: "Villa" },
		{ id: 10, name: "Vineyard" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updateEstate = { ...estate };
		updateEstate.address = address;
		updateEstate.title = title;
		updateEstate.nightly_rate = parseInt(nightlyRate, 10);
		updateEstate.type_id = parseInt(type, 10);
		updateEstate.description = description;

		const editConfirm = await dispatch(editEstate(updateEstate));
		if (editConfirm.errors) {
			setErrors(editConfirm.errors);
			return;
		} else {
			await dispatch(genEstates());
			setShowModal(false);
		}
	};
	return (
		<form className="estate-edit-form" onSubmit={handleSubmit}>
			<h2 className='edit-estate'>Edit Estate</h2>
			<div className={"estate-edit-input"}>
					{/* <textarea
						className={"critique-text-area"}
						name="body"
						placeholder="Leave a review... "
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/> */}

					<div className="form-field">
						<label>Estate Title</label>
						<input
							type="text"
							value={title}
							required
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="form-field">
						<label>Address</label>
						<input
							type="text"
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<div className="form-field">
						<label>Nightly Rate</label>
						<input
							type="number"
							value={nightlyRate}
							className="short-input"
							required
							onChange={(e) => setNightlyRate(e.target.value)}
						/>
					</div>
					<div className="form-field">
						<label>Estate Type</label>
						<select
							className="short-input"
							onChange={(e) => {
								console.log(e.target.value);
								setType(e.target.value);
							}}
							value={type}
						>
							{typeList.map((type) => (
								<option key={type.id} value={type.id}>
									{type.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-field">
						<label>Description</label>
						<input
							id="text-input"
							type="textarea"
							value={description}
							required
							rows={5}
							cols={5}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<input type="number" value={ownerId} required hidden readOnly/>
			</div>
			<button className={"btn"} type="submit">
				Update Estate
			</button>
			{Object.keys(errors).length > 0 && (
				<div className="form-errors">
					{Object.keys(errors).map(
						(key) => `${key.toUpperCase()}: ${errors[key]}`
					)}
				</div>
			)}
		</form>
	);
};

export default EstateRow;
