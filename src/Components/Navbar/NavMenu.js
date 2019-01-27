import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import gql from 'graphql-tag';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import QueryHOC from '../HOC/QueryHOC';

const query = gql`{
  currentUser {
    roles { id, name }
  }
}`;

@withRouter
@QueryHOC(query)
export default class NavMenu extends Component {
  state = { anchorEl: null }

  mapMenuItemToJSX = this.mapMenuItemToJSX.bind(this);

  mapMenuItemToJSX({ path, title }, index) {
    return (
      <MenuItem
        key={path + index}
        onClick={(e) => {
          this.props.history.push(path);
          this.setState({ anchorEl: null });
        }}
      >
        {title}
      </MenuItem>
    );
  }

  render() {
    const { queryResults: { data, loading } } = this.props;
    const { anchorEl } = this.state;
    const isOpen = Boolean(anchorEl);

    const navMenuConfig = getNavMenu(data, loading);
    return (
      <>
        <IconButton
          className="menuButton"
          color="inherit"
          aria-label="Menu"
          aria-haspopup="true"
          aria-owns={isOpen ? 'navMenu' : undefined}
          onClick={e => this.setState({ anchorEl: e.target })}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="navMenu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={e => this.setState({ anchorEl: null })}
        >
          {navMenuConfig.map(this.mapMenuItemToJSX)}
        </Menu>
      </>
    );
  }
}

function getNavMenu(data, loading) {
  const baseMenu = [
    { path: '/', title: 'Dashboard' },
    { path: '/overviewsupply', title: 'Voorraad' },
  ];

  if (loading || !data || !data.currentUser.roles.length) return baseMenu;

  const combinedMenu = data.currentUser.roles.reduce(combineRoleMenus, baseMenu);
  return uniqueItems(combinedMenu, 'path');
}

function combineRoleMenus(accumMenu, { name: roleName }) {
  const roleMenu = require(`./rolemenus/${roleName.replace(' ', '-')}`).default; // eslint-disable-line global-require, import/no-dynamic-require
  return update(accumMenu, { $push: roleMenu });
}

function uniqueItems(arr, comp) {
  const unique = arr.map(e => e[comp])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);
  return unique;
}
