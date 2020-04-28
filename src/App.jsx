import React from 'react';
import { ruRU } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import AdminLogin from './pages/admin/login/Login';

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
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Router>
          <Switch>
            <RouteWrapper path="/admin/login" component={AdminLogin} layout={(props) => <Default {...props} paperSize={'sm'} />} />
            <RouteWrapper path="/" component={Home} layout={Default} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;