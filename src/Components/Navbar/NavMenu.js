import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const navMenuConfig = {
  items: [
    { path: '/', title: 'Dashboard' },
    { path: '/products', title: 'Producten' },
    { path: '/locations', title: 'Locaties' },
    { path: '/categories', title: 'Categorieën' },
    { path: '/suppliers', title: 'Leveranciers' },
    { path: '/users', title: 'Gebruikers (admin)' },
    { path: '/reservations', title: 'Reserveringen' },
  ],
};

@withRouter
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
    const { anchorEl } = this.state;
    const isOpen = Boolean(anchorEl);
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
          {navMenuConfig.items.map(this.mapMenuItemToJSX)}
        </Menu>
      </>
    );
  }
}
