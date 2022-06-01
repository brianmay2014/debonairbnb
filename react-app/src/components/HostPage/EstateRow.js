import React from "react";
import { useDispatch } from 'react-redux'
import { deleteEstate } from "../../store/estate";
// import "./HomePage.css";

const EstateRow = ({ estate }) => {
	const address = `${estate?.city}, ${estate?.state}`;
	const dispImg = estate?.images[0]?.url;

	const dispatch = useDispatch();

	// console.log(estate);

	const submitDelete = async (e) => {
		e.preventDefault();

		const data = await dispatch(deleteEstate(estate))
		// if (data) {
		// 	setErrors(data)
		// }
	};

    // submitEdit

	return (
		<div className="estate-rows" id={`estate-row-${estate?.id}`}>
			<div className="row-left" id="estate-display">
				<a href={`/estates/${estate?.id}`}>
					<img
						src={dispImg}
						alt={`main-estate-${estate?.id}`}
					/>
				</a>
				<div className="row-buttons">
					<button className='btn'>Modify</button>
					<button className='btn-cancel' onClick={submitDelete}>Dispose</button>
				</div>
			</div>
			<div className="home-row-text">
				<div className="row-title">{estate?.title}</div>
				<div className="row-address">{estate?.address}</div>
				<div className="row-description">{estate?.description}</div>
				<div className="row-cost">
					${estate?.nightly_rate}{" "}
					<span className="per-night">per night</span>
				</div>
			</div>
		</div>
	);
};

export default EstateRow;
