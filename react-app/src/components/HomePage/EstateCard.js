import React from "react";

import "./HomePage.css";

const EstateCard = ( { estate } ) => {


	const address = `${estate?.city}, ${estate?.state}`;
    const dispImg = estate?.images[0]?.url;

    // console.log(estate);

	return (
		<div className="estate-cards" id={`estate-card-${estate?.id}`}>
			<div id="type-filter-bar"></div>
			<div className="home-card-img" id="estate-display">
				<a href={`/estates/${estate?.id}`}>
                <img src={dispImg} alt="yup" />
                </a>
			</div>
			<div className="home-card-text">
				<div className="card-top-bar">
					<div className="card-address">{address}</div>
					<div className="card-critique">
						{estate?.rating}{' '}
						<i class="fa fa-star" aria-hidden="true"></i>
					</div>
				</div>
				<div className="card-availabilty">Feb 1-6</div>
				<div className="card-cost">
					${estate?.nightly_rate} <span className='per-night'>per night</span>
				</div>
			</div>
		</div>
	);
};

export default EstateCard;
