import React, { Component } from 'react';
import './navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import gql from 'graphql-tag';
import { Route, Switch, withRouter } from 'react-router-dom';
import QueryHOC from '../HOC/QueryHOC';
import client from '../../apollo';

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
  secure {
    users {
      firstName
    }
  }
}`;

@QueryHOC(query)
@withRouter
export class NavbarContent extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  logout = this.logout.bind(this);

  handleMenu = this.handleMenu.bind(this);

  handleClose = this.handleClose.bind(this);

  logout() {
    localStorage.clear();
    client.resetStore();
    this.props.history.push('/login');
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) return 'Er ging iets fout';

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const user = data.secure.users[0];
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className='typography'>
            Welkom, {user.firstName}
          </Typography>
          <div className='menuRight'>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbaraccount' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbaraccount"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Account</MenuItem>
                <MenuItem onClick={this.logout}>Log uit</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
