import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import { YMInitializer } from 'react-yandex-metrika';

import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import store from './store';
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

function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => <Layout {...props}>
      <Component {...props} />
    </Layout>} />
  );
}

function PrivateRouter({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => {
      if (localStorage.getItem('token'))
        return <Layout {...props}>
          <Component {...props} />
        </Layout>

      return <Redirect to='/login' />
    }} />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

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

            <Router>
              <Switch>
                <RouteWrapper exact name="home" path="/" component={Home} layout={(props) => <Default {...props} paperSize={'md'} />} />
                <RouteWrapper exact name="login" path="/login" component={AdminLogin} layout={(props) => <Default {...props} paperSize={'sm'} />} />
                <PrivateRouter exact name="dashboard" path="/dashboard" component={AdminDashboard} layout={(props) => <Default {...props} paperSize={'xl'} />} />
                <RouteWrapper name="404" component={NoMatchPage} layout={(props) => <Default {...props} paperSize={'md'} />} />
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