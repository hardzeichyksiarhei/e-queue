import React from 'react';
import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import store from './store';

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

function App(props) {
  const { auth: { user, token } } = store.getState();
  
  if (!user && token) {
    store.dispatch(fetchUser())
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
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

export default App;