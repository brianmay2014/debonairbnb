import LogoutButton from '../../auth/LogoutButton';
import { Redirect, useHistory, NavLink } from "react-router-dom";

const ProfileButton = () => {
  return (
    <ul>
    <li>
      <NavLink to='/' exact={true} activeClassName='active'>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/login' exact={true} activeClassName='active'>
        Login
      </NavLink>
    </li>
    <li>
      <NavLink to='/sign-up' exact={true} activeClassName='active'>
        Sign Up
      </NavLink>
    </li>
    <li>
      <NavLink to='/users' exact={true} activeClassName='active'>
        Users
      </NavLink>
    </li>
    <li>
      <LogoutButton />
    </li>
  </ul>
  )
}

export default ProfileButton
