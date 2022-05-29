const SearchGuestsInput = ({ setGuestNumber }) => {
  return (
    <div className="search-guests-input">
      <input
        type="number"
        name="guest-number"
        onChange={(e) => setGuestNumber(parseInt(e.target.value))}
      />
    </div>
  );
};

export default SearchGuestsInput;
