import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '../../assets/images/signout.svg'
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='logout button' onClick={onLogout}>
      <img className='icon nav signout' src={LogoutIcon} alt="logoutIcon" />
      <span>Logout</span>
    </div>
  )
};

export default LogoutButton;
