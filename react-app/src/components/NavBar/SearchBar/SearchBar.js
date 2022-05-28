import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"
import SearchDestinationInput from "./SearchDestinationInput/SearchDestinationInput";
import SearchDurationInput from "./SearchDurationInput/SearchDurationInput";
import SearchGuestsInput from "./SearchGuestsInput/SearchGuestsInput";
import {createResults} from "../../../store/search"

import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [guestNumber, setGuestNumber] = useState(1);
  const estates = useSelector((state) => Object.values(state.estates));
  const history = useHistory()

  const openSearchForm = (e) => {
    e.stopPropagation();
    if (showSearchForm) return;
    setShowSearchForm(true);
  };

  useEffect(() => {
    if (!showSearchForm) return;

    const closeSearchForm = () => {
      setShowSearchForm(false);
    };

    document.addEventListener("click", closeSearchForm);

    return () => document.removeEventListener("click", closeSearchForm);
  }, [showSearchForm]);

// Submits filtered search results to store and redirects to link which displays results
  const handleSubmit = (e) => {
    e.preventDefault()
    const filteredEstateResults = estates.filter(estate => {
      return estate.state === destination
    })
    dispatch(createResults(filteredEstateResults))
let searchUrlArray = []
    filteredEstateResults.map(estate => {
      searchUrlArray.push(estate.id)
})
console.log(searchUrlArray)
    return history.push(`/search?estateids=${searchUrlArray.join(',')}`)
}

  return (
    <div className="search-container">
      <div className="search-buttons-container">
        <button onClick={openSearchForm}>
          <p>Anywhere</p>
        </button>
        <button onClick={openSearchForm}>
          <p>Any Week</p>
        </button>
        <button onClick={openSearchForm}>
          <p>Add guests</p>
        </button>
      </div>
      {showSearchForm && (
        <form onSubmit={handleSubmit} className="search-inputs" onClick={(e) => e.stopPropagation()}>
          <SearchDestinationInput setDestination={setDestination} />
          <SearchDurationInput setDateRange={setDateRange}/>
          <SearchGuestsInput setGuestNumber={setGuestNumber}/>
        </form>
      )}
    </div>
  );
}

export default SearchBar;
