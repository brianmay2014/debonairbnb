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
  const [alphabetizedSet, setAlphabetizedSet] = useState([]);
  const [hiddenButtonsDest, setHiddenButtonsDest] = useState(false);
  const [hiddenButtons, setHiddenButtons] = useState(false);

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

  // useEffect for hiding buttons
  useEffect(() => {
    const unHideButtons = () => {
      setHiddenButtonsDest(false);
      setHiddenButtons(false);
    };

    document.addEventListener("click", unHideButtons);
    return () => document.removeEventListener("click", unHideButtons);
  }, [hiddenButtonsDest, hiddenButtons]);

  const handleHiddenButtonsDestination = () => {
    setHiddenButtonsDest(true);
    setHiddenButtons(true);
  };

  // Submits filtered search results to store and redirects to link which displays results
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredEstateResults = estates.filter((estate) => {
      return estate.state === destination;
    });
    dispatch(createResults(filteredEstateResults));
    let searchUrlArray = [];
    filteredEstateResults.map((estate) => {
      searchUrlArray.push(estate.id);
    });
    let anywhereArrayResults = [];
    estates.map((estate) => {
      anywhereArrayResults.push(estate.id);
    });
    if (searchUrlArray.length) {
      setDestinationValueHolder(destination);
      return history.push(`/search?estateids=${searchUrlArray.join(",")}`);
    }

    // returns all estates if there are no search result suggestions
    if (!destination) {
      return history.push(
        `/search?estateids=${anywhereArrayResults.join(",")}`
      );
    }

    if (destination && estates.find(estate => `${estate.state}, ${estate.country}` === destination)) {

      let estatesArraySingle = []

      estates.map(estate => {
        if (`${estate.state}, ${estate.country}` === destination) {
          estatesArraySingle.push(estate.id)
        }
      })
      console.log(estatesArraySingle)
      return history.push(
        `/search?estateids=${estatesArraySingle.join(",")}`
      );

    }
    // returns results of first item in search result suggestions
    if (alphabetizedSet.length && destination !== alphabetizedSet[0].split(',')[0]) {
      let firstSearchResultArray = [];

      const firstSearchFilter = estates.filter(
        (estate) => estate.state === alphabetizedSet[0].split(",")[0]
      );

      firstSearchFilter.map((estate) => {
        firstSearchResultArray.push(estate.id);
      });


      return history.push(
        `/search?estateids=${firstSearchResultArray.join(",")}`
      );
    }

    if (alphabetizedSet.length > 1 && alphabetizedSet.includes(destination)) {
      let firstSearchResultArray = [];
      const firstSearchFilter = estates.filter(
        (estate) => `${estate.state}, ${estate.country}` === destination
      );

      firstSearchFilter.map((estate) => {
        firstSearchResultArray.push(estate.id);
      });


      return history.push(
        `/search?estateids=${firstSearchResultArray.join(",")}`
      );
    }
    setAlphabetizedSet([]);
  };

  return (
    <div className="search-container-with-nav">
      {hiddenButtons && <nav className="search-mini-nav">Stays</nav>}
      <div className={hiddenButtons ? "" : "search-container"}>
        <form
          onSubmit={handleSubmit}
          className="search-form"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={
              hiddenButtonsDest ? "hidden-buttons" : "search-buttons-container"
            }
          >
            {/* <AnimatedButton /> */}
            <button onClick={handleHiddenButtonsDestination}>
              <p>{destinationValueHolder}</p>
            </button>
            <span className="search-button-spans"></span>
            <button onClick={openDateMenu}>
              <p>Any Week</p>
            </button>
            <span className="search-button-spans"></span>

            <button onClick={openGuestsMenu} className="guest-icon-button">
              <p>
                Add guests <i class="fa-solid fa-magnifying-glass"></i>
              </p>
            </button>
          </div>

          <div className={hiddenButtons ? "inputs-revealed" : "inputs-hidden"}>
            <div className="search-inputs">
              <label>Where</label>
              <SearchDestinationInput
                setDestination={setDestination}
                setAlphabetizedSet={setAlphabetizedSet}
              />
            </div>
            <div className="search-inputs">
              <label>When</label>
              <SearchDurationInput setDateRange={setDateRange} />
            </div>
            <div className="search-inputs">
              <label>Who</label>
              <div className="guest-input">
                <SearchGuestsInput setGuestNumber={setGuestNumber} />
                <button type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
