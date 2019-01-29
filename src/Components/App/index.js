import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AuthRequired from '../AuthRequired';
import Login from '../Login';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import UsersView from '../UsersView';
import SuppliersView from '../SuppliersView';
import LocationsView from '../LocationsView';
import CategoriesView from '../CategoriesView';
import ItemsView from '../ItemsView';
import ReservationsView from '../ReservationsView';
import OrdersView from '../OrdersView';
import SupplyView from '../SupplyView';
import SuggestionsView from '../SuggestionsView';
import UnauthorizedView from '../UnauthorizedView';

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
            <Route path="/unauthorized" component={ UnauthorizedView } />
            <Route path="/login" component={ Login } />
            <Route path="/users" component={ UsersView } />
            <Route path="/items" component={ ItemsView } />
            <Route path="/overviewsupply" component={ SupplyView } />
            <Route path="/locations" component={ LocationsView } />
            <Route path="/categories" component={ CategoriesView } />
            <Route path="/suppliers" component={ SuppliersView } />
            <Route path="/orders" component={ OrdersView } />
            <Route path="/reservations" component={ ReservationsView } />
            <Route path="/suggestions" component={ SuggestionsView } />
            <Route path="/" component={ Dashboard } />
          </Switch>
        </AuthRequired>
      </MuiThemeProvider>
    );
  }
}
