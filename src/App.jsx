import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import { YMInitializer } from 'react-yandex-metrika';

import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import { history } from './index';
import { connect } from 'react-redux';

import Home from './pages/Home';
import AdminLogin from './pages/admin/login/Login';
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import NoMatchPage from './pages/NoMatchPage';

import './App.sass';
import Default from './pages/layout/Default';
import { fetchUser } from './store/actions/authActions';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2157a1' }
  },
}, ruRU);

class App extends Component {
  componentDidMount() {
    const { user, token, dispatch } = this.props;
    if (!user && token) {
      dispatch(fetchUser())
    }
  }

  render() {
    const { user, token } = this.props;

    return (!user && token) ? <div className="app-loading"><CircularProgress /></div>
      : (
        <ThemeProvider theme={theme}>
          <div className="app-container">
            {process.env.NODE_ENV === 'production' ? <YMInitializer accounts={[62470567]} /> : ''}

            <Router history={history}>
              <Switch>
                <Route exact name="home" path="/" component={Home} />
                <Route exact name="login" path="/login" component={AdminLogin} />
                <Route exact name="dashboard" path="/dashboard" component={AdminDashboard} />
                <Route name="404" component={NoMatchPage} />
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
      );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

export default connect(mapStateToProps)(App);