import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import loadAllResults from "../../store/search";

const SearchResults = () => {
  const dispatch = useDispatch();
  const estates = useSelector((state) => Object.values(state.searchResults));
  const reloadEstates = useSelector((state) => Object.values(state.estates));
  const [estateResults, setEstateResults] = useState([]);
  const { search } = useLocation();
  const resultIds =search.split("=")[1].split(",");
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log(parseInt(search.split("=")[1].split(",")));
  console.log(resultIds, '=============')
  useEffect(() => {
    if (reloadEstates) {
      setIsLoaded(true)
    }
  }, [dispatch]);
  // console.log(reloadEstates);
  return (
    <div>
      {estates && !isLoaded
        ? estates.map((estate) => {
            return <p> {estate.address}</p>;
          })
        : reloadEstates.map((estate) => {
          console.log(estate.id)
          console.log(resultIds, '=============')
            if (resultIds.includes(estate.id.toString()) || resultIds === estate.id.toString()) {
              return <p> {estate.address} </p>;
            }
          })}
    </div>
  );
};

export default SearchResults;
