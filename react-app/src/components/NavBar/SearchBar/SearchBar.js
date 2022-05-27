import React from 'react'
import SearchDestination from './SearchDestination/SearchDestination.js'
import SearchDuration from './SearchDuration/SearchDuration.js'
import SearchGuests from './SearchGuests/SearchGuests.js'

function SearchBar() {
  return (
    <form className="search-container">
      <SearchDestination />
      <SearchDuration />
      <SearchGuests />
    </form>
  )
}

export default SearchBar;
