import React, { createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import useLocalStorageState from 'use-local-storage-state/dist';

export const UserContext = createContext([])

function App() {
  const [loggedInUser, setLoggedInUser] = useLocalStorageState('userInfo:', [{
    isSignedIn: false,
    name: '',
    email: '',
  }])
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
