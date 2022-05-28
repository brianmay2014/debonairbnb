import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import EstatePage from './components/estate/EstatePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { genEstates } from './store/estate';
import UploadImage from './components/UploadImage/UploadeImage';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const estates = useSelector((state) => state.estates)

  useEffect(() => {
    dispatch(genEstates());
  }, [dispatch]);

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
      <NavBar />
      <UploadImage estate={estates[1]} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path="/estates/:id" exact={true}>
          <EstatePage />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
