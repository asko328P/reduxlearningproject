import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import MustBeLoggedInRoute from './MustBeLoggedInRoute';
import MustNotBeLoggedInRoute from './MustNotBeLoggedInRoute';
import Bicycles from './Bicycles';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MustNotBeLoggedInRoute>
              <Login />
            </MustNotBeLoggedInRoute>
          }
        />
        <Route
          path="/register"
          element={
            <MustNotBeLoggedInRoute>
              <Register />
            </MustNotBeLoggedInRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <MustBeLoggedInRoute>
              <Profile />
            </MustBeLoggedInRoute>
          }
        />
        <Route
          path="/bicycles"
          element={
            <MustBeLoggedInRoute>
              <Bicycles />
            </MustBeLoggedInRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
