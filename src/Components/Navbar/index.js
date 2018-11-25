import React, { Component } from 'react';
import './navbar.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import gql from 'graphql-tag';
import { Route, Switch, withRouter } from 'react-router-dom';
import QueryHOC from '../HOC/QueryHOC';
import client from '../../apollo';

const query = gql`{
  users {
    firstName
  }
}`;

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

const theme = createMuiTheme({
  // because we apparently use typography and it will be deprecated with the next release,
  // to have a smooth transition:
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0a45c1',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

@QueryHOC(query)
@withRouter
export class NavbarContent extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  logout = this.logout.bind(this);

  logout() {
    localStorage.clear();
    client.resetStore();
    this.props.history.push('/login');
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) return 'Er ging iets fout';
    const user = data.users[0];

    return (
      <div className='navbar'>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className='typography'>
                Welkom, {user.firstName}
              </Typography>
              <div className='menuRight'>
                <div>
                  <IconButton
                    className='button'
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
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
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
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
        </MuiThemeProvider>
      </div>
    );
  }
}
