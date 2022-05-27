import "./SearchDestinationInput.css";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
const SearchDestinationInput = ({ data }) => {
  const [destinationValue, setDestinationValue] = useState();
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const displayInputValue = (e) => {
    console.log(e.target.value);
    setShowSearchSuggestions(false);
    setDestinationValue(e.target.innerText);
  };

  const handleDestinationFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
      // console.log(value.state)
      if (value.state) {
        return value.state.toLowerCase().includes(searchWord.toLowerCase());
      } else {
        return;
      }
    });
    setFilteredData(newFilter);
    setDestinationValue(searchWord);
  };

  useEffect(() => {
    if (filteredData) {
      setShowSearchSuggestions(true);
    }
    if (destinationValue === "") {
      setShowSearchSuggestions(false);
    }
  }, [destinationValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="Destination"
        value={destinationValue}
        onChange={handleDestinationFilter}
      />
      <div className="destination-results">
        {filteredData.length != 0 &&
          showSearchSuggestions &&
          filteredData.map((value, key) => {
            if (value.state && value.country) {
              return (
                <div className="destination-item" onClick={displayInputValue}>
                  {value.state}, {value.country}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default SearchDestinationInput;
