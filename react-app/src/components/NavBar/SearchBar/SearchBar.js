import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SearchDestinationInput from "./SearchDestinationInput/SearchDestinationInput";
import SearchDurationInput from "./SearchDurationInput/SearchDurationInput";
import SearchGuestsInput from "./SearchGuestsInput/SearchGuestsInput";
import { createResults } from "../../../store/search";
// import AnimatedButton from "./AnimatedButton/AnimatedButton"
import { dateArrayCreator } from "../../../utils/dateArrayCreator";

import "./SearchBar.css";

function SearchBar() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [destinationValue, setDestinationValue] = useState();
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [guestNumber, setGuestNumber] = useState(1);
  const estates = useSelector((state) => Object.values(state.estates));
  const charters = useSelector((state) => Object.values(state.charters));
  const history = useHistory();
  const [destinationValueHolder, setDestinationValueHolder] =
    useState("Search States");
  const [alphabetizedSet, setAlphabetizedSet] = useState([]);
  const [hiddenButtonsDest, setHiddenButtonsDest] = useState(false);
  const [hiddenButtons, setHiddenButtons] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentState, setCurrentState] = useState("Search States");
  const [showSearchBar, setShowSearchBar] = useState(true);
  const { search } = useLocation();
  const [searchResultLoaded, setSearchResultLoaded] = useState(false);
  const [dragLeave, setDragLeave] = useState(false);

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
  const closeDateMenu = (e) => {
    e.stopPropagation();
    if (!showDateMenu) return;
    setShowDateMenu(false);
    setShowGuestsMenu(true);
    setShowDestinationMenu(true);
  };
  const openGuestsMenu = (e) => {
    e.stopPropagation();
    if (showGuestsMenu) return;
    setShowGuestsMenu(true);
    setShowDestinationMenu(false);
    setShowDateMenu(false);
  };

  const stateId = parseInt(search?.split("=")[1]?.split(",")[0]);
  const searchUrlNoResults = search?.split("=")[0];
  const stateIdEstate = estates?.find((estate) => estate.id === stateId)?.state;
  // console.log(stateId);
  useEffect(() => {
    // console.log(searchUrlNoResults);
    if (searchUrlNoResults === "?noResults") {
      setCurrentState("Anywhere");
    } else if (stateIdEstate) {
      setCurrentState(stateIdEstate);
    } else {
      setCurrentState("Search States");
    }

    setSearchResultLoaded(true);
  }, [estates, currentState]);

  useEffect(() => {
    if (!showDestinationMenu && !showDateMenu && !showGuestsMenu) return;
    // console.log(showDateRange);
    if (showDateRange) return;

    const closeForms = () => {
      setShowDestinationMenu(false);
      setShowDateMenu(false);
      setShowGuestsMenu(false);
    };
    document.addEventListener("click", closeForms);
    return () => document.removeEventListener("click", closeForms);
  }, [showDestinationMenu, showDateMenu, showGuestsMenu, showDateRange]);



  // useEffect for hiding buttons
  useEffect(() => {
    const unHideButtons = () => {

        // setHiddenButtonsDest(false);
        // setHiddenButtons(false);
      }


    document.addEventListener("click", unHideButtons);
    return () => document.removeEventListener("click", unHideButtons);
  }, [hiddenButtonsDest, hiddenButtons]);

  const handleHiddenButtonsDestination = (e) => {
    e.preventDefault();
    setHiddenButtonsDest(true);
    setHiddenButtons(true);
  };

  // Submits filtered search results to store and redirects to link which displays results
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("YES");
    setShowDateRange(false);
    setHiddenButtonsDest(false);

    setHiddenButtons(false);

    const dateRangeFromSearch = dateArrayCreator(
      new Date(checkinDate),
      new Date(checkoutDate)
    );

    const filteredEstateResults = estates?.filter((estate) => {
      return estate.state === destination?.split(",")[0];
    });

    const filteredEstateIds = [];

    if (filteredEstateResults.length) {
      filteredEstateResults.map((estate) => {
        return filteredEstateIds.push(estate.id);
      });
    } else {
      estates?.map((estate) => {
        return filteredEstateIds.push(estate.id);
      });
    }

    const chartersFromFilteredEstates = charters.filter((charter) =>
      filteredEstateIds.includes(charter.estate_id)
    );
    // console.log(destination);
    // console.log(filteredEstateResults);
    // console.log(filteredEstateIds, "FILTERED ESTATE IDSSSSS");
    // console.log(chartersFromFilteredEstates);
    const allDestCharterObjs = [];

    chartersFromFilteredEstates.forEach((charter) => {
      const charterObj = {};
      charterObj.estate_id = charter.estate_id;
      charterObj.dateArray = dateArrayCreator(
        new Date(charter.start_date),
        new Date(charter.end_date)
      );
      allDestCharterObjs.push(charterObj);
      //  allDatesFromCharters.push( {[`estate_id: ${charter.estate_id}`]: dateArrayCreator(new Date(charter.start_date), new Date(charter.end_date))})
    });

    // console.log(allDestCharterObjs, '==================')

    // console.log(allDatesFromCharters, 'HERE')
    // const conflictingCharters = charters.filter(charter => {
    const allCharterObjs = [];
    // })
    const excludedEstateIds = [];
    // console.log(dateRangeFromSearch);
    dateRangeFromSearch.forEach((date) => {
      // console.log(allDestCharterObjs)
      allDestCharterObjs.forEach((obj) => {
        obj.dateArray.forEach((objDate) => {
          if (
            objDate.toString().split(" ").splice(0, 4).join(" ") ===
            date.toString().split(" ").splice(0, 4).join(" ")
          ) {
            // console.log("===========");
            if (!excludedEstateIds.includes(obj.estate_id)) {
              excludedEstateIds.push(obj.estate_id);
            }
          }
        });
      });
    });

    // console.log(excludedEstateIds, 'HERE ESTAte')

    charters.forEach((charter) => {
      const charterObj = {};
      charterObj.estate_id = charter.estate_id;
      charterObj.dateArray = dateArrayCreator(
        new Date(charter.start_date),
        new Date(charter.end_date)
      );
      allCharterObjs.push(charterObj);
      //  allDatesFromCharters.push( {[`estate_id: ${charter.estate_id}`]: dateArrayCreator(new Date(charter.start_date), new Date(charter.end_date))})
    });

    dateRangeFromSearch.forEach((date) => {
      // console.log(allDestCharterObjs)
      allCharterObjs.forEach((obj) => {
        obj.dateArray.forEach((objDate) => {
          if (
            objDate.toString().split(" ").splice(0, 4).join(" ") ===
            date.toString().split(" ").splice(0, 4).join(" ")
          ) {
            // console.log("===========");
            if (!excludedEstateIds.includes(obj.estate_id)) {
              excludedEstateIds.push(obj.estate_id);
            }
          }
        });
      });
    });

    // console.log(excludedEstateIds, "EXCLUDED");

    let searchUrlArray = [];
    let noResultUrlArray = [];

    filteredEstateResults.map((estate) => {
      if (!excludedEstateIds.includes(estate.id))
        searchUrlArray.push(estate.id);
    });

    estates.map((estate) => {
      if (!excludedEstateIds.includes(estate.id))
        noResultUrlArray.push(estate.id);
    });

    // console.log(searchUrlArray, 'URL ARRAY')
    // let anywhereArrayResults = [];
    // estates.map((estate) => {
    //   if (!excludedEstateIds.includes(estate.id))
    //   anywhereArrayResults.push(estate.id);
    // });

    if (!destination || destination === " " || !alphabetizedSet.length) {
      setShowSearchSuggestions(false);
      setCurrentState("Anywhere");
      return history.push(`/search?noResults=${noResultUrlArray.join(",")}`);
    }

    if (searchUrlArray.length) {
      setDestinationValueHolder(destination);
      // setAlphabetizedSet([]);
      setDestinationValue(destination)
      // setFilteredData([]);
      setShowSearchSuggestions(false);

      return history.push(`/search?estateids=${searchUrlArray.join(",")}`);
    }

    // returns all estates if there are no search result suggestions

    if (
      destination &&
      estates.find(
        (estate) => `${estate.state}, ${estate.country}`.toLowerCase() === destination.toLowerCase()
      )
    ) {
      let estatesArraySingle = [];

      estates.map((estate) => {
        if (`${estate.state}, ${estate.country}`.toLowerCase() === destination.toLowerCase) {
          setCurrentState(estate?.state);
          estatesArraySingle.push(estate.id);
        }
      });
      // setAlphabetizedSet([]);
      // setDestination('')
      // setFilteredData([]);
      setShowSearchSuggestions(false);

      return history.push(`/search?estateids=${estatesArraySingle.join(",")}`);
    }
    // returns results of first item in search result suggestions
    if (
      alphabetizedSet.length &&
      destination !== alphabetizedSet[0].split(",")[0]
    ) {
      let firstSearchResultArray = [];
      // console.log(alphabetizedSet, 'ALPHA HERE')
      // console.log(excludedEstateIds, 'EXXCLUDED')

      const firstSearchFilter = estates.filter(
        (estate) =>
          estate.state === alphabetizedSet[0].split(",")[0] &&
          !excludedEstateIds.includes(estate.id)
      );

      firstSearchFilter.map((estate) => {
        firstSearchResultArray.push(estate.id);
      });

      // setAlphabetizedSet([]);
      // setDestination('')
      // setFilteredData([]);
      setShowSearchSuggestions(false);
      setCurrentState(firstSearchFilter[0]?.state);

      return history.push(
        `/search?estateids=${firstSearchResultArray.join(",")}`
      );
    }

    if (alphabetizedSet.length > 1 && alphabetizedSet.includes(destination)) {
      let firstSearchResultArray = [];
      const firstSearchFilter = estates.filter(
        (estate) => `${estate.state}, ${estate.country}`.toLowerCase() === destination.toLowerCase()
      );

      firstSearchFilter.map((estate) => {
        firstSearchResultArray.push(estate.id);
      });
      // setAlphabetizedSet([]);
      // setDestination('')
      // setFilteredData([]);

      setShowSearchSuggestions(false);
      setCurrentState(firstSearchFilter[0]?.state);
      return history.push(
        `/search?estateids=${firstSearchResultArray.join(",")}`
      );
    }

    setAlphabetizedSet([]);
    setFilteredData([]);
    setShowSearchSuggestions(false);
    // console.log(destinationValue)
  };

  useEffect(() => {
    setDestinationValue(destinationValue)
  },[dispatch])

  if (!sessionUser) {
    return null;
  }
  // console.log(destination, "DESTINATION YOOOO");
  // console.log(filteredData);



  return (
    <div className="search-container-with-nav">
      <div
        className={
          hiddenButtons ? "search-container-showing" : "search-container"
        }
      >
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
              {/* <p>{destinationValueHolder}</p> */}
              {searchResultLoaded && <p>{currentState}</p>}
            </button>
            <span className="search-button-spans">|</span>
            {/* <button onClick={openDateMenu}> */}
            <button onClick={handleHiddenButtonsDestination}>
              <p>Search Dates</p>
            </button>
            {/* <span className="search-button-spans"></span> */}
            {/*
            <button onClick={openGuestsMenu} className="guest-icon-button">
              <p>
                Add guests
              </p>
            </button> */}
          </div>

          <div className={hiddenButtons ? "inputs-revealed" : "inputs-hidden"}>
            <div className="search-inputs">
              <label>Where</label>
              <SearchDestinationInput
                setDragLeave={setDragLeave}
                showSearchSuggestions={showSearchSuggestions}
                setShowSearchSuggestions={setShowSearchSuggestions}
                setDestination={setDestination}
                setAlphabetizedSet={setAlphabetizedSet}
                setShowDateRange={setShowDateRange}
                setDestinationValue={setDestinationValue}
                destinationValue={destinationValue}
                destination={destination}
                setFilteredData={setFilteredData}
                filteredData={filteredData}
                showSearchBar={showSearchBar}
              />
            </div>
            <div className="search-inputs">
              {/* <label id='when-label'>When</label> */}
              <div id="search-duration-input">
                <SearchDurationInput
                  setCheckinDate={setCheckinDate}
                  setCheckoutDate={setCheckoutDate}
                  checkoutDate={checkoutDate}
                  checkinDate={checkinDate}
                  setDateRange={setDateRange}
                  showDateRange={showDateRange}
                  setShowDateRange={setShowDateRange}
                />
                <button id="search-button-icon">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            {/* <div className="search-inputs">
              <label>Who</label>
              <div className="guest-input">
                <SearchGuestsInput setGuestNumber={setGuestNumber} />

              </div>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
