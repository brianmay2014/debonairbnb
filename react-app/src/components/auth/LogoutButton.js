import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ( {closeMenu} ) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {

    await dispatch(logout());
    closeMenu();
  };

  return (
		<button className="btn-cancel" onClick={onLogout}>
			Logout
		</button>
  );
};

export default LogoutButton;
