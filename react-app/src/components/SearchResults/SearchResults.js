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
console.log(resultIds)
  useEffect(() => {
    if (reloadEstates) {
      setIsLoaded(true);
    }
  }, []);

  const images = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/a29c28ab-814d-4e6d-b3e5-40596e17ae03.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/5999b661-a257-4686-a830-c58c9e681be3.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/4be2df54-ea6d-4aab-955e-eec96b3147b7.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/8292c786-b74f-4297-a7fb-f21fa59f494e.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-52634799/original/1238ce4f-94e6-445b-abaf-8c73aa50e9e3.jpeg",
  ];

  return (
    <div className="search-results-container">
      <div className="search-results-list">
        {isLoaded && reloadEstates.map((estate) => {
              if (
                resultIds.includes(estate.id.toString()) ||
                resultIds === estate.id.toString()
              ) {
                return (
                  <div className="search-results-card">
                    <Link to={`/estates/${estate.id}`}>
                      <img src={images[0]}></img>
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

export default SearchResults;
