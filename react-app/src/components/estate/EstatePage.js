import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './estatePage.css';
import ImageDisplay from "./ImageDisplay";
import DescriptionAvailCharter from "./DescriptionAvailCharter";
import CritiqueDisplay from "./CritiqueDisplay";
import { genEstates } from "../../store/estate";
import LocationDisplay from "./LocationDisplay";


// const estate = {
// 	address: "10922 Corbly Gulch Rd, Belgrade, MT 59714",
// 	owner_id: 2,
// 	title: "Bozeman Overlook",
// 	nightly_rate: 790,
// 	type_id: 3,
// 	description:
// 		"Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
// };

const EstatePage = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(genEstates());        
    }, [dispatch])
    
       
    const estate = useSelector((state) => state.estates[id]);
    console.log(estate);


	// once state is constructed
	// const estate = useSelector((state) => state.estate[id])

	// const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	//     dispatchEvent(getEstate(id));
	// }, [dispatch]);

    const address = `${estate?.city}, ${estate?.state}, ${estate?.country}`

        return (
			<div id="estate-body">
				<div className="estate-head-info">
					<div id="estate-head-title">{estate?.title}</div>
					<div id="estate-head-info">
						<div>
							{estate?.rating} stars -{" "}
							{estate?.critique_ids.length} critiques
						</div>
						<div>{address}</div>
					</div>
				</div>

				<ImageDisplay estate={estate} />
				<DescriptionAvailCharter estate={estate} />
				<CritiqueDisplay estate={estate} />
                <LocationDisplay estate={estate} />
			</div>
		);
    
};

export default EstatePage;
