import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QueryHOC from '../HOC/QueryHOC';
import NavMenu from './NavMenu';
import LogoutMenu from './LogoutMenu';

import './navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Switch>
          <Route path="/login" render={() => 'Login'} />
          <Route path="/" component={NavbarContent} />
        </Switch>
      </div>
    );
  }
}

const query = gql`{
  users {
    firstName
  }
}`;

@QueryHOC(query)
export class NavbarContent extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) return 'Er ging iets fout';

    const user = data.users[0];
    return (
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="menuLeft">
            <NavMenu />
          </div>
          <Typography variant="h6" color="inherit" className="typography">
            Welkom, {user.firstName}
          </Typography>
          <div className="menuRight">
            <LogoutMenu />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
