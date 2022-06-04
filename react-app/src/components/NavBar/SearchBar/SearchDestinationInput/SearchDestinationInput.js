import "./SearchDestinationInput.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchDestinationInput = ({
	data,
	setDestination,
	setAlphabetizedSet,
	setShowDateRange,
}) => {
	const [destinationValue, setDestinationValue] = useState();
	const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const estates = useSelector((state) => Object.values(state.estates));

	// sets value of input to search suggestion
	const displayInputValue = (e) => {
		setShowSearchSuggestions(false);
		setDestinationValue(e.target.innerText);
		setFilteredData(Array.from(filteredSet).sort());
	};

	const filteredSet = new Set();
	// filters through states to list corresponding states in list
	const handleDestinationFilter = (e) => {
		const searchWord = e.target.value;
		const newFilter = estates.filter((value) => {
			if (value.state) {
				return value.state
					.toLowerCase()
					.includes(searchWord.toLowerCase());
			} else {
				return;
			}
		});
		newFilter.map((estate) => {
			filteredSet.add(`${estate.state}, ${estate.country}`);
		});
		const filteredAlphabetized = Array.from(filteredSet).sort();

		setFilteredData(Array.from(filteredSet).sort());
		if (filteredAlphabetized.length) {
			setAlphabetizedSet(filteredAlphabetized);
		}
		setDestinationValue(searchWord);
	};
  
    const closeCal = async (e) => {
      e.preventDefault();
      setShowDateRange(false);
    };

	// shows suggestions if there is data to filter through and closes suggestions if it's an empty string

	useEffect(() => {
		if (filteredData) {
			setShowSearchSuggestions(true);
		}
		if (destinationValue === "") {
			setShowSearchSuggestions(false);
		}
		setDestination(destinationValue);
	}, [destinationValue]);

	return (
		<div>
			<input
				id='state-search-input'
				type="text"
				placeholder="Search destinations"
				value={destinationValue}
				onChange={handleDestinationFilter}
        onClick={closeCal}
			/>
			<div
				className={
					filteredData.length != 0 && showSearchSuggestions
						? "destination-results"
						: "destination-results-hidden"
				}
			>
				{filteredData.length != 0 &&
					showSearchSuggestions &&
					filteredData.map((value, key) => {
						return (
							<div
								className="destination-item"
								onClick={displayInputValue}
							>
								<i class="fa-solid fa-location-dot"></i>
								{value}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SearchDestinationInput;
