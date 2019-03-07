import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact = {true}
            component={HomePage}
          />
          <Route
            path="/login"
            exact = {true}
            component={LoginPage}
          />
          <Route
            path=""
            exact = {false}
            component={NotFoundPage}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
