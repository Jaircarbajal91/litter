import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import BlueCatIcon from '../../assets/images/BlueCatIcon.svg'
import { login } from '../../store/session';
import exit from '../../assets/images/exit.svg'
import './LoginForm.css'

const LoginForm = ({ setShowLogin, setShowSignup }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');

  const [emailErrors, setEmailErrors] = useState('')
  const [passwordErrors, setPasswordErrors] = useState('')

  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    if (emailErrors.length || passwordErrors.length) return
    const data = await dispatch(login(email, password));
    if (data) {
      const arr = data[0].split(' : ')
      setErrors([arr[1]])
    } else {
      setShowLogin(false)
      history.push('/home')
    }
  };


  useEffect(() => {
    const newEmailErrors = []
    const newPasswordErrors = []

    if (email.length < 1) newEmailErrors.push('Email is required')
    if (password.length < 1) newPasswordErrors.push('Password is required')

    setEmailErrors(newEmailErrors)
    setPasswordErrors(newPasswordErrors)

    if (!emailErrors.length && !passwordErrors.length) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password, emailErrors.length, passwordErrors.length])

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setErrors([])
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setErrors([])
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const registerNewUser = e => {
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  }

  const signInDemo = async () => {
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
    setShowLogin(false)
    history.push('/home')
  }

  return (
    <div className='login form container'>
      <div className='top-row container'>
        <img className='exit-icon' onClick={() => setShowLogin(false)} src={exit} alt='exit-icon' />
        <img className='sign-up cat-icon' src={BlueCatIcon} alt="cat-icon" />
      </div>
      <div className='signup-header'><h1>Log in</h1></div>
      <div className='other-errors login'>
        {errors.map((error, ind) => (
          <span key={ind}>{error}</span>
        ))}
      </div>
      <form className='login form' onSubmit={onLogin}>
        <div className='login-form input-fields'>
          <div className='login input-wrapper'>
            <input
              name='email'
              className={`input email login`}
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <div className='login-errors-container'>
              <span className='login errors'>{emailErrors[0]}</span>
            </div>
          </div>
          <div className='login input-wrapper'>
            <input
              name='password'
              className={`input password login`}
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='login-errors-container'>
              <span className='login errors'>{passwordErrors[0]}</span>
            </div>
          </div>
        </div>
        <div className='login buttons'>
          <div className='button demo' onClick={signInDemo}>Demo User</div>
          <button disabled={isDisabled} className='button login form' type='submit'>Login</button>
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
