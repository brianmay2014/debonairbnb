import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchDestinationInput from "./SearchDestinationInput/SearchDestinationInput";
import SearchDurationInput from "./SearchDurationInput/SearchDurationInput";
import SearchGuestsInput from "./SearchGuestsInput/SearchGuestsInput";
import { createResults } from "../../../store/search";
// import AnimatedButton from "./AnimatedButton/AnimatedButton"

import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [guestNumber, setGuestNumber] = useState(1);
  const estates = useSelector((state) => Object.values(state.estates));
  const history = useHistory();
  const [destinationValueHolder, setDestinationValueHolder] =
    useState("Anywhere");
  const [ alphabetizedSet, setAlphabetizedSet] = useState([])

  const openDestinationMenu = (e) => {
    e.stopPropagation();
    if (showDestinationMenu) return;
    setShowDestinationMenu(true);
    setShowDateMenu(false);
    setShowGuestsMenu(false);
  };
  const openDateMenu = (e) => {
    e.stopPropagation();
    if (showDateMenu) return;
    setShowDateMenu(true);
    setShowGuestsMenu(false);
    setShowDestinationMenu(false);
  };
  const openGuestsMenu = (e) => {
    e.stopPropagation();
    if (showGuestsMenu) return;
    setShowGuestsMenu(true);
    setShowDestinationMenu(false);
    setShowDateMenu(false);
  };

  useEffect(() => {
    if (!showDestinationMenu && !showDateMenu && !showGuestsMenu) return;

    const closeForms = () => {
      setShowDestinationMenu(false);
      setShowDateMenu(false);
      setShowGuestsMenu(false);
    };

    document.addEventListener("click", closeForms);

    return () => document.removeEventListener("click", closeForms);
  }, [showDestinationMenu, showDateMenu, showGuestsMenu]);

  // Submits filtered search results to store and redirects to link which displays results
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredEstateResults = estates.filter((estate) => {
      return estate.state === destination;
    });
    // console.log(destination)
    // console.log(filteredEstateResults)
    dispatch(createResults(filteredEstateResults));
    let searchUrlArray = [];
    filteredEstateResults.map((estate) => {
      searchUrlArray.push(estate.id);
    });
    let anywhereArrayResults = [];
    estates.map((estate) => {
      anywhereArrayResults.push(estate.id);
    });
    // console.log(anywhereArrayResults)
    // console.log(searchUrlArray);
    if (searchUrlArray.length) {
      // console.log('===========')
      setDestinationValueHolder(destination)
      return history.push(`/search?estateids=${searchUrlArray.join(",")}`);
    }

    if (!alphabetizedSet.length) {
      return history.push(
        `/search?estateids=${anywhereArrayResults.join(",")}`
      )
    } else {
    // const singleEstateFromSearchResults = estates.find(estate => estate.state === alphabetizedSet[0])
    // console.log(singleEstateFromSearchResults)

    let firstSearchResultArray = []

    const firstSearchFilter = estates.filter((estate) => estate.state === alphabetizedSet[0])

    firstSearchFilter.map(estate => {
      firstSearchResultArray.push(estate.id)
    })

    return history.push(
      `/search?estateids=${firstSearchResultArray.join(",")}`
    )
    }
    // else {
    //   // console.log(anywhereArrayResults);
      // return history.push(
      //   `/search?estateids=${anywhereArrayResults.join(",")}`
    //   );
    // }
  };

  return (
    <div className="search-container">
      <div className="search-buttons-container">
        {/* <AnimatedButton /> */}
        <button onClick={openDestinationMenu}>
          <p>{destinationValueHolder}</p>
        </button>
        <button onClick={openDateMenu}>
          <p>Any Week</p>
        </button>
        <button onClick={openGuestsMenu}>
          <p>Add guests</p>
          <div className="search-icon"></div>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="search-inputs"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="submit">
          <i class="fak fa-magnifying-glass-solid"></i>
        </button>
        {showDestinationMenu && (
          <SearchDestinationInput setDestination={setDestination} setAlphabetizedSet={setAlphabetizedSet}/>
        )}
        {showDateMenu && <SearchDurationInput setDateRange={setDateRange} />}
        {showGuestsMenu && (
          <SearchGuestsInput setGuestNumber={setGuestNumber} />
        )}
      </form>
    </div>
  );
}

export default SearchBar;
