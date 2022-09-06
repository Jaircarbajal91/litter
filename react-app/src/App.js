import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import WhiteCatIcon from './assets/images/WhiteCatIcon.svg'
import backgroundImage from './assets/images/background.png'
import SplashPage from './components/SplashPage';
import HomeTweets from './components/HomeTweets';
import { Modal } from './context/Modal'
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const dispatch = useDispatch();



  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);

    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage sessionUser={sessionUser} setShowSignup={setShowSignup} setShowLogin={setShowLogin}/>
          {showLogin && <Modal onClose={() => setShowLogin(false)}>
            <LoginForm setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
          </Modal>}
          {showSignup && <Modal onClose={() => setShowSignup(false)}>
              <SignUpForm setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
            </Modal>}
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <NavBar />
          <HomeTweets sessionUser={sessionUser} />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
