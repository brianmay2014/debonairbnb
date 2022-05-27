
import React from 'react';


import SearchBar from './SearchBar/SearchBar'
import NavIcon from './NavIcon/NavIcon'
import ProfileButton from './ProfileButton/ProfileButton'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav-home">
      <NavIcon />

      <SearchBar />

      <ProfileButton />

    </nav>
  );
}

export default NavBar;
