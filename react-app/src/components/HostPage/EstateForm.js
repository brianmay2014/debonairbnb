import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEstate } from "../../store/estate";
import "./HostPage.css";

const EstateForm = () => {

    const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	const [errors, setErrors] = useState(['hello']);
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [nightlyRate, setNightlyRate] = useState(0);
    const [type, setType] = useState(6);
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
	    // const typeList = {
		// 		1: "Castle",
		// 		2: "Chateau",
		// 		3: "Country House",
		// 		4: "Historic",
		// 		5: "Island",
		// 		6: "Manor",
		// 		7: "Mansion",
		// 		8: "Palace",
		// 		9: "Villa",
		// 		10: "Vineyard"};

	const submitEstate = async (e) => {
		e.preventDefault();
		// console.log('the type is', type);
		// console.log(typeof type)
		// console.log( typeof parseInt(type, 10))
		const type_id = parseInt(type, 10)
		// console.log(address, title, nightlyRate, type_id, description, ownerId);
		const data = await dispatch(createEstate(address, title, nightlyRate, type, description, ownerId));
		if (data) {
			setErrors(data)
		}
	};

	return (
		<form id="estate-form" onSubmit={submitEstate}>
			{/* <ul className="form-errors">
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul> */}
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
						console.log(e.target.value)
						setType(e.target.value)}
					}
					value={type}
				>
					{typeList.map((type) => (
						<option key={type.id} value={type.id}>{type.name}</option>
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
            <button type="submit" className='btn'>Add Estate</button>
		</form>
	);
};

export default EstateForm;
