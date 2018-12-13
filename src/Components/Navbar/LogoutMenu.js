import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import client from '../../apollo';

@withRouter
export default class LogoutMenu extends Component {
  state = { anchorEl: null }

  logout = this.logout.bind(this);

  logout() {
    localStorage.clear();
    client.resetStore();
    this.props.history.push('/login');
  }

  render() {
    const { anchorEl } = this.state;
    const isOpen = Boolean(anchorEl);
    return (
      <>
        <IconButton
          aria-owns={isOpen ? 'logoutMenu' : undefined}
          aria-haspopup="true"
          onClick={e => this.setState({ anchorEl: e.target })}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="logoutMenu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={e => this.setState({ anchorEl: null })}
        >
          <MenuItem onClick={this.logout}>
            Log uit
          </MenuItem>
        </Menu>
      </>
    );
  }
}
