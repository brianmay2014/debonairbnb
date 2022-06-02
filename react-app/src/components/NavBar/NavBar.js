
import React from 'react';

import SearchBar from './SearchBar/SearchBar'
import NavIcon from './NavIcon/NavIcon'
import ProfileButton from './ProfileButton/ProfileButton'
import HostPatronButton from './HostPatronButton/HostPatronButton'
import './NavBar.css'
import {useLocation} from "react-router-dom"

const NavBar = () => {
  let location = useLocation()

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

      <div className='nav-buttons'>
        <HostPatronButton />
        <ProfileButton />
      </div>

    </nav>
  );
}

export default NavBar;
