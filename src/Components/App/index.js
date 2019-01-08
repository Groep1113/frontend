import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AuthRequired from '../AuthRequired';
import Login from '../Login';
import Navbar from '../Navbar';
import Item from '../Item';
import Location from '../Location';
import Category from '../Category';
import Dashboard from '../Dashboard';
import UsersView from '../UsersView';
import SuppliersView from '../SuppliersView';
import Reservation from '../Reservation';

const theme = createMuiTheme({
  // because we apparently use typography and the old variant types will be
  // deprecated with the next release, to have a smooth transition:
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0a45c1',
    },
  },
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <AuthRequired>
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/users" component={ UsersView } />
            <Route path="/products" component={ Item } />
            <Route path="/locations" component={ Location } />
            <Route path="/categories" component={ Category } />
            <Route path="/suppliers" component={ SuppliersView } />
            <Route path="/reservations" component={ Reservation } />
            <Route path="/" component={ Dashboard } />
          </Switch>
        </AuthRequired>
      </MuiThemeProvider>
    );
  }
}
