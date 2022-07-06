import "./SearchDestinationInput.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchDestinationInput = ({
  setDestination,
  destination,
  setAlphabetizedSet,
  setShowDateRange,
  setDestinationValue,
  destinationValue,
  showSearchSuggestions,
  setShowSearchSuggestions,
  setFilteredData,
  filteredData,
  setDragLeave

}) => {

  const estates = useSelector((state) => Object.values(state.estates));

  // sets value of input to search suggestion
  const displayInputValue = (e) => {
    setShowSearchSuggestions(false);
    setDestinationValue(e.target.innerText);
    setFilteredData(Array.from(filteredSet).sort());
  };
const dispatch = useDispatch()
  const filteredSet = new Set();
  // filters through states to list corresponding states in list
  const handleDestinationFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = estates.filter((value) => {
      if (value.state) {
        // console.log(value.state, "value-state")
        console.log(searchWord)
        return `${value.state.toLowerCase()} ${value.country.toLowerCase()}`.includes(searchWord.toLowerCase());
      } else {
        return;
      }
    });
    // console.log(newFilter);
    if (newFilter.length) {
      newFilter.map((estate) => {
        filteredSet.add(`${estate.state}, ${estate.country}`);
      });
    }
    const filteredAlphabetized = Array.from(filteredSet).sort();


    if (filteredAlphabetized.length && destination !== ' ') {
      // console.log(filteredAlphabetized)
      setAlphabetizedSet(filteredAlphabetized);
    } else {
			setAlphabetizedSet([]);
		}

    setFilteredData(Array.from(filteredSet).sort());
    setDestinationValue(searchWord);
  };

  const closeCal = async (e) => {
    e.preventDefault();
    setShowDateRange(false);
    // setDragLeave(true)
  };

  // shows suggestions if there is data to filter through and closes suggestions if it's an empty string

  useEffect(() => {
    if (filteredData) {
      setShowSearchSuggestions(true);
    }
    if (filteredData === []) {
      setFilteredData([])
    }

    if (destinationValue === "" || destinationValue === ' ') {
      setShowSearchSuggestions(false);
    }
    setDestination(destinationValue);
  }, [destinationValue, filteredData, destination]);


  useEffect(() => {
    setDestination(destinationValue)
  }, [])

  // const handleDragLeave = (e) => {
  //   // console.log('HERE')
  //   e.preventDefault()
  //   setDragLeave(true)
  //   };

  console.log(destinationValue)

  return (
    <div>
      <input
        id="state-search-input"
        type="text"
        placeholder="Search destinations"
        value={destinationValue}
        onChange={handleDestinationFilter}
        onClick={closeCal}
        autocomplete='off'
        // onDrag={handleDragLeave}
        // draggable="true"
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
          filteredData?.map((value, key) => {
            return (
              <div className="destination-item" onClick={displayInputValue}>
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
