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
import { getAllTweetsThunk } from './store/tweets';
import Tweets from './components/Tweets';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  const allTweets = useSelector(state => state.tweets.tweetsList)
  const sessionUser = useSelector(state => state.user)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      if (sessionUser) {
        await dispatch(getAllTweetsThunk())
      }
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
          <SplashPage />
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <NavBar />
          <Tweets tweets={allTweets} />
        </ProtectedRoute>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
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
