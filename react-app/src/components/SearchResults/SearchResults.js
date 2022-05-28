import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from "react"

const SearchResults = () => {
  const estates = useSelector((state => Object.values(state.searchResults)))
  return (
    <div>
      {estates.map(estate => {
        console.log(estate)
        return (
          <p> {estate.address}</p>
        )
      })}
    </div>
  )
}

export default SearchResults
