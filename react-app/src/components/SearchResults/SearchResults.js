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
  const resultIds = search.split("=")[1].split(",");
  const [isLoaded, setIsLoaded] = useState(false);
  const [gKey, setGKey] = useState(null);


    useEffect(() => {
      const getKey = async () => {
        const response = await fetch("api/estates/key");
        const key = await response.text();
        setGKey(key);
      };
      getKey();
    }, []);

  useEffect(() => {
    if (reloadEstates) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="search-results-container">
      <div className="search-results-list">
        {isLoaded &&
          reloadEstates.map((estate) => {
            if (
              resultIds.includes(estate.id.toString()) ||
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
      </div>
      <div className="search-results-map">
        {gKey && <SearchMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          resultIds={resultIds}
          gKey={gKey}
        />}
      </div>
    </div>
  );
};

//test

export default SearchResults;
