import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import loadAllResults from "../../store/search";
import SearchMap from "./SearchMap/SearchMap";
import "./SearchResults.css";
import EstateCard from "../HomePage/EstateCard";

const SearchResults = () => {
  const dispatch = useDispatch();
  const reloadEstates = useSelector((state) => Object.values(state.estates));
  const [estateResults, setEstateResults] = useState([]);
  const { search } = useLocation();
  let resultIds = search?.split("=")[1]?.split(",");
  const [isLoaded, setIsLoaded] = useState(false);
  const [gKey, setGKey] = useState(null);
  const [searchMessage, setSearchMessage] = useState(null);
  const allEstates = useSelector((state) => Object.values(state.estates));
  const [searchIds, setSearchIds] = useState(false);
  const [searchStateLoaded, setSearchStateLoaded] = useState(false);
  const [reloadEstatesLoaded, setReloadEstatesLoaded] = useState(false);

  const allEstateIds = [];
  allEstates?.forEach((estate) => {
    allEstateIds.push(estate.id.toString());
  });

  if (!resultIds) {
    resultIds = []
  }

  const firstResultState = reloadEstates?.find((estate) => estate.id === parseInt(resultIds[0]))
        ?.state;


  useEffect(() => {
    const getKey = async () => {
      const response = await fetch("/api/estates/key");
      const key = await response.text();
      setGKey(key);
    };

    getKey();
  }, []);

  // useEffect(() => {
  //   if (search === "?noResults") {
  //     setSearchIds(false)
  //     setSearchMessage(
  //       "Could not find any estates based on your search. Showing results for all estates."
  //       );
  //     }

  //     if (resultIds.length) {
  //     setSearchMessage(`Showing results for ${firstResultState}`)
  //     setSearchIds(true)
  //   }
  // },[])

  useEffect(() => {

      if (search === "?noResults") {
        setSearchIds(false);
        setSearchMessage(
          "Could not find any estates based on your search. Showing results for all estates."
        );
      } else {
        setSearchIds(true);
        setSearchMessage(`Showing results for ${firstResultState}`);
        setSearchStateLoaded(true);
        setReloadEstatesLoaded(true);
      }

      // if (resultIds?.length && firstResultState) {

      //   setSearchMessage(`Showing results for ${firstResultState}`);
      //   setSearchIds(true);
      // }

  }, [reloadEstates]);

  // useEffect(() => {
  //   if (search === "?noResults") {
  //     setSearchIds(false);
  //     setSearchMessage(
  //       "Could not find any estates based on your search. Showing results for all estates."
  //     );
  //   }
  //   if (resultIds?.length) {

  //     if (resultIds?.length && firstResultState) {
  //       console.log(
  //         reloadEstates?.find((estate) => estate.id === parseInt(resultIds[0]))
  //       );
  //       setSearchMessage(`Showing results for ${firstResultState}`);
  //       setSearchIds(true);
  //       setSearchStateLoaded(true)
  //       setReloadEstatesLoaded(true)
  //     }
  //   }
  // }, [search, searchMessage]);

  useEffect(() => {
    if (reloadEstates || allEstateIds.length) {
      setIsLoaded(true);
    }
  }, []);
  console.log(resultIds)

  return (
    <div className="search-results-container">
      <div className="search-results-list">
        <div className="search-message">
          {reloadEstates && <p>{searchMessage}</p>}
        </div>

        {isLoaded &&
          reloadEstates &&
          searchIds &&
          reloadEstates.map((estate) => {
            if (
              resultIds?.includes(estate.id.toString()) ||
              resultIds === estate.id.toString()
            ) {
              return (
                <EstateCard
                  className="search-results-card"
                  estate={estate}
                  showType={true}
                />
              );
            }
          })}

        {!searchIds &&
          allEstates.length &&
          allEstates?.map((estate) => {
            return (
              <>
                <EstateCard
                  className="search-results-card"
                  estate={estate}
                  showType={true}
                />
              </>
            );
          })}
      </div>
      <div className="search-results-map">
        {gKey &&  (
          <SearchMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            resultIds={resultIds.length ? resultIds : allEstateIds}
            gKey={gKey}
          />
        )}
      </div>
    </div>
  );
};

//test

export default SearchResults;
