import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEstate } from "../../store/estate";
import "./HostPage.css";

const EstateForm = () => {

    const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [nightlyRate, setNightlyRate] = useState(0);
    const [type, setType] = useState(1);
    const [description, setDescription] = useState('');
    const [ownerId, setOwnerId] = useState(user.id);

    const typeList = [
		{id: 1, name: "Castle"},
		{id: 2, name: "Chateau"},
		{id: 3, name: "Country House"},
		{id: 4, name: "Historic"},
		{id: 5, name: "Island"},
		{id: 6, name: "Manor"},
		{id: 7, name: "Mansion"},
		{id: 8, name: "Palace"},
		{id: 9, name: "Villa"},
		{id: 10, name: "Vineyard"},
	];


	const submitEstate = async (e) => {
		e.preventDefault();
		// default image url:
		// https://debonairbnb.s3.amazonaws.com/607f9451bb2d43dab5a7d456c0537d86.png

		const type_id = parseInt(type, 10)
		// console.log(address, title, nightlyRate, type_id, description, ownerId);
		const newEstate = await dispatch(createEstate(address, title, nightlyRate, type, description, ownerId));
		if (newEstate.errors) {
			console.log(newEstate.errors)
			setErrors(newEstate.errors)
			return;
		} else {
			setAddress('')
			setTitle('')
			setNightlyRate(0)
			setType(1)
			setDescription('')
			setErrors({})
		}
	};


	return (
		<form id="estate-form" onSubmit={submitEstate}>
			{/* <ul className="form-errors"> */}
				{Object.keys(errors).length > 0 && (
					<div className="form-errors">
						{Object.keys(errors).map(
							// (key) => `${errors[key]}`
							(key) => `${key.toUpperCase()}: ${errors[key]}`
						)}
					</div>
				)}
			{/* </ul> */}
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
			<input type="number" value={ownerId} required hidden />
			<button type="submit" className="btn">
				Add Estate
			</button>
		</form>
	);
};

export default EstateForm;
