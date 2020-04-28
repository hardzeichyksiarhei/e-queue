import React from 'react';
import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './pages/Home';
import AdminLogin from './pages/admin/login/Login';
import AdminDashboard from './pages/admin/dashboard/Dashboard';

import './App.sass';
import Default from './pages/layout/Default';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2157a1' }
  },
}, ruRU);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => {
      return (
        localStorage.getItem('token') && rest.name === 'login'
          ? <Redirect to='dashboard' />
          : <Layout {...props}>
            <Component {...props} />
          </Layout>
      )
    }} />
  );
}


function PrivateRoute({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => {
      return (
        localStorage.getItem('token')
          ? <Layout {...props}>
            <Component {...props} />
          </Layout>
          : <Redirect to='login' />
      )
    }} />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Router>
          <Switch>
            <RouteWrapper name="login" path="/login" component={AdminLogin} layout={(props) => <Default {...props} paperSize={'sm'} />} />
            <PrivateRoute name="dashboard" path="/dashboard" component={AdminDashboard} layout={(props) => <Default {...props} paperSize={'xl'} />} />
            <RouteWrapper name="home" path="/" component={Home} layout={Default} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;