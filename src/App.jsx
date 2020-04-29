import React from 'react';
import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  HashRouter as Router,
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Router>
          <Switch>
            <RouteWrapper name="login" path="/login" component={AdminLogin} layout={(props) => <Default {...props} paperSize={'sm'} />} />
            <PrivateRouter name="dashboard" path="/dashboard" component={AdminDashboard} layout={(props) => <Default {...props} paperSize={'xl'} />} />
            <RouteWrapper name="home" path="/" component={Home} layout={Default} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;