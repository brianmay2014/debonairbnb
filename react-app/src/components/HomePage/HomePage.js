import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HomePage.css";
import EstateCard from "./EstateCard";

import { genEstates } from "../../store/estate";
import { genEstateTypes } from "../../store/estateType";
import EstateFilterLink from "./EstateFilterLink";


const HomePage = () => {

	const [typeFilter, setTypeFilter] = useState(null);
	const estateTypes = useSelector((state) => state.estateTypes);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(genEstates());
		// dispatch(genEstateTypes());
	}, [dispatch]);

    const estates = useSelector((state) => state.estates);
	if (!estates) {
		return null;
	}

	if (typeFilter) {
		console.log(estateTypes[typeFilter])
	}


    const estateArr = typeFilter ?
		estateTypes[typeFilter].estate_ids.map(id => estates[id])
		: Object.values(estates);

	const filterButtons = Object.values(estateTypes).map(
		(type) => <EstateFilterLink estateType={type} handleClick={setTypeFilter} currentFilter={typeFilter} />
	);

	return (
		<div id="home-page-container">
			<div id="type-filter-bar">
				{filterButtons}
			</div>
			<div class="estate-display">
                {estateArr.map((estate) => {
                    return (
                        <EstateCard
                        key={`estate-${estate.id}`}
                        estate={estate}/>

                    )
                })}
			</div>
		</div>
	);
};

export default HomePage;
