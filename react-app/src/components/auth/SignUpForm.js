import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import exit from '../../assets/images/exit.svg'
import './SignupForm.css'

const SignUpForm = ({ setShowSignup, setShowLogin }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [lastName, setLastName] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [profileImageErrors, setProfileImageErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username.toLowerCase(), email, password, firstName, lastName, profileImage));
    if (data) {
      const arr = data[0].split(' : ')
      setErrors([arr[1]])
    } else {
      setShowSignup(false)
    }
  };


  useEffect(() => {
    const errors = {
      username: [],
      firstName: [],
      lastName: [],
      profileImage: [],
      email: [],
      password: [],
    }
    const regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;


    if (username.length < 1) errors.username.push('Please enter a username')
    if (username.length > 25) errors.username.push('Username is too long')

    if (firstName.length < 1) errors.firstName.push('Please enter First Name')
    if (firstName.length > 30) errors.firstName.push('First name is too long')

    if (lastName.length < 1) errors.lastName.push('Please enter Last Name')
    if (lastName.length > 30) errors.lastName.push('Last name is too long')

    if (profileImage.length > 200) errors.profileImage.push('Profile image url too long')
    if (!profileImage.match(regex)) errors.profileImage.push('Please enter a valid image address. \n E.g. "https://example.com/image.jpg"')

    if (email.length > 60) errors.email.push('Email is too long')
    if (!validateEmail(email)) errors.email.push('Please enter a valid email')

    if (password.length < 8 || repeatPassword.length < 8) errors.password.push('Password must be at least 8 characters')
    if (password !== repeatPassword) errors.password.push('Passwords must match')

    setUsernameErrors(errors.username)
    setFirstNameErrors(errors.firstName)
    setLastNameErrors(errors.lastName)
    setProfileImageErrors(errors.profileImage)
    setEmailErrors(errors.email)
    setPasswordErrors(errors.password)

    if (!usernameErrors.length &&
      !firstNameErrors.length &&
      !lastNameErrors.length &&
      !profileImageErrors.length &&
      !emailErrors.length &&
      !passwordErrors.length &&
      !errors.length) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [username, firstName, lastName, profileImage, email, password, repeatPassword, usernameErrors.length, firstNameErrors.length, lastNameErrors.length, profileImageErrors.length, emailErrors.length, passwordErrors.length, errors.length])


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const backToLogin = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  console.log('---------------------------------------')
  console.log("username: ", usernameErrors)
  console.log("firstname: ", firstNameErrors)
  console.log("lastname: ", lastNameErrors)
  console.log("profileImage: ", profileImageErrors)
  console.log("email: ", emailErrors)
  console.log("password: ", passwordErrors)
  console.log("disabled: ", isDisabled)

  return (
    <div className='signup-form-container'>
      <div className='exit-icon' onClick={() => setShowSignup(false)}>
        <img src={exit} alt='exit-icon' />
      </div>
      <form className='sign-up' onSubmit={onSignUp}>
        <div className='other-errors'>
          {errors.length > 0 && <span>{errors[0]}</span>}
        </div>
        <div className='signup-form input-fields'>
          <div className='signup input-wrapper'>
            <input
              type='text'
              className={`input username`}
              placeholder='Enter a username'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            ></input>
            <span className='signup-errors username'>{usernameErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='text'
              className={`input first-name`}
              placeholder='First Name'
              name='first-name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            ></input>
            <span className='signup-errors first-name'>{firstNameErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='text'
              className={`input last-name`}
              placeholder='Last Name'
              name='last-name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            ></input>
            <span className='signup-errors last-name'>{lastNameErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='url'
              className={`input url`}
              placeholder='Profile URL Image'
              name='profile-image'
              onChange={(e) => setProfileImage(e.target.value)}
              value={profileImage}
              required
            ></input>
            <span className='signup-errors url'>{profileImageErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='email'
              className={`input email`}
              placeholder='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
            <span className='signup-errors email'>{emailErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='password'
              className={`input password`}
              placeholder='Password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
            <span className='signup-errors password'>{passwordErrors[0]}</span>
          </div>
          <div className='signup input-wrapper'>
            <input
              type='password'
              className={`input repeat password`}
              placeholder='Repeated Password'
              name='repeat_password'
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required
            ></input>
            <span className='signup-errors repeat-password'>{passwordErrors[0]}</span>
          </div>
        </div>
        <button disabled={isDisabled} className='button signup form' type='submit'>Sign Up</button>
      </form>
      <div className='Login-redirect-container'>
        <span className='login-redirect'>Have an account already?</span>
        <span className='login-button' onClick={backToLogin}> Log in</span>
      </div>
    </div>
  );
};

export default SignUpForm;
