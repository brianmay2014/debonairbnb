import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import loadAllResults from "../../store/search";
import SearchMap from "./SearchMap/SearchMap";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const reloadEstates = useSelector((state) => Object.values(state.estates));
  const [estateResults, setEstateResults] = useState([]);
  const { search } = useLocation();
  const resultIds = search.split("=")[1].split(",");
  const [isLoaded, setIsLoaded] = useState(false);

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
                <div className="search-results-card">
                  <Link to={`/estates/${estate.id}`}>
                    <img src={estate.images[0]}></img>
                  </Link>
                  <Link to={`/estates/${estate.id}`}>
                    <h3 style={{ color: "black" }}>
                      {estate.type} in {estate.state}{" "}
                    </h3>
                  </Link>
                  <p>${estate.nightly_rate} night</p>
                </div>
              );
            }
          })}
      </div>
      <div className="search-results-map">
        <SearchMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          resultIds={resultIds}
        />
      </div>
    </div>
  );
};

//test

export default SearchResults;
