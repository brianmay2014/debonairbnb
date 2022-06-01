
import React from 'react';

import SearchBar from './SearchBar/SearchBar'
import NavIcon from './NavIcon/NavIcon'
import ProfileButton from './ProfileButton/ProfileButton'
import './NavBar.css'
import {useLocation} from "react-router-dom"

const NavBar = () => {
  let location = useLocation()
  console.log(location)
  if (location.pathname === "/charters") {
    return (
      <nav className="nav-home">
        <NavIcon />
      </nav>
    );
  }
  return (
    <nav className="nav-home">
      <NavIcon />

      <SearchBar />

      <ProfileButton />

    </nav>
  );
}

export default NavBar;
