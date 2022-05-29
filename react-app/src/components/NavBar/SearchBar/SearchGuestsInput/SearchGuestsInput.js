const SearchGuestsInput = ({ setGuestNumber }) => {
  return (
    <div className="search-guests-input">
      <input
        type="number"
        name="guest-number"
        onChange={(e) => setGuestNumber(parseInt(e.target.value))}
      />
      <div className="search-icon">
        <button type="submit">
          <i class="fak fa-magnifying-glass-solid"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchGuestsInput;
