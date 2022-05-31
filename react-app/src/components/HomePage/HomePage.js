import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HomePage.css";
import EstateCard from "./EstateCard";

import { genEstates } from "../../store/estate";


const HomePage = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(genEstates());
	}, [dispatch]);

    const estates = useSelector((state) => state.estates);

    const estateArr = Object.values(estates);
    console.log(estateArr);
	// const address = `${estate?.city}, ${estate?.state}, ${estate?.country}`;

	return (
		<div id="home-page-container">
			<div id="type-filter-bar"></div>
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
