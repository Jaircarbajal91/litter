import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import BlueCatIcon from '../../assets/images/BlueCatIcon.svg'
import { login } from '../../store/session';
import exit from '../../assets/images/exit.svg'

const LoginForm = ({ setShowLogin, setShowSignup }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setShowLogin(false)
      history.push('/home')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const registerNewUser = e => {
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  }

  return (
    <div className='login form container'>
      <div className='top-row container'>
        <img className='exit-icon' onClick={() => setShowSignup(false)} src={exit} alt='exit-icon' />
        <img className='sign-up cat-icon' src={BlueCatIcon} alt="cat-icon" />
      </div>
      <div className='signup-header'><h1>Log in</h1></div>
      <form className='login form' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <span key={ind}>{error}</span>
          ))}
        </div>
        <div className='login input-wrapper'>
          <input
            name='email'
            className={`input email login`}
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='signup-form input-fields'>
          <div className='login input-wrapper'>
            <input
              name='password'
              className={`input password login`}
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Login</button>
          </div>
        </div>
      </form>
      <div className='signup-redirect-container'>
        <span className='register-button'>Don't have an account?</span>
        <span className='register-button login-text' onClick={registerNewUser}> Sign up</span>
      </div>
    </div>
  );
};

export default LoginForm;
