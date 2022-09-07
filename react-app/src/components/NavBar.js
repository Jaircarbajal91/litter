import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SignOut from '../assets/images/signout.svg'
import './NavBar.css'

const NavBar = () => {
  const history = useHistory()
  return (
    <nav className='navbar'>
        <div onClick={() => history.push('/')} className='navlink'>
            <img className='signout-icon' src={SignOut} alt="signout-icon" />
            <span>Home</span>
        </div>
        {/* <li>
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
        </li> */}
        <div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
