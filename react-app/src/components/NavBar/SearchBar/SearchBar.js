import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import SearchDestinationInput from "./SearchDestinationInput/SearchDestinationInput";
import SearchDurationInput from "./SearchDurationInput/SearchDurationInput";
import SearchGuestsInput from "./SearchGuestsInput/SearchGuestsInput";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [showSearchForm, setShowSearchForm] = useState(false);

  const openSearchForm = () => {
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
        <div className="search-inputs" onClick={(e) => e.stopPropagation()}>
          <SearchDestinationInput  />
          <SearchDurationInput />
          <SearchGuestsInput />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
