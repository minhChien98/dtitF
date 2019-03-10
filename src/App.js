import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import ContestOne from './containers/ContestOne/ContestOne';
import LoginPage from './containers/LoginPage/LoginPage';
import HomePage from './containers/HomePage/HomePage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <CssBaseline />
        <Router>
          <Switch>
          <Route
              path="/"
              exact = {true}
              component={HomePage}
              history={this.props.history}
            />
            <Route
              path="/contestOne"
              exact = {true}
              component={ContestOne}
              history={this.props.history}
            />
            <Route
              path="/login"
              exact = {true}
              component={LoginPage}
              history={this.props.history}
            />
            <Route
              path="/register"
              exact = {true}
              component={RegisterPage}
              history={this.props.history}
            />
            <Route
              path=""
              exact = {false}
              component={NotFoundPage}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
