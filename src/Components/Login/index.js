import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  // because we apparently use typography and it will be deprecated with the next release,
  // to have a smooth transition:
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0a45c1',
    },
  },
});

@withRouter
export default class Login extends Component {
    state = { email: 'admin@bs-htg.nl', password: 'habbo123' };

    onSubmit = this.onSubmit.bind(this)

    onSubmit(event) {
      event.preventDefault();
      localStorage.setItem('loggedIn', true);
      const { email, password } = this.state;
      localStorage.setItem('BasicAuth', btoa(`${email}:${password}`));
      this.props.history.push('/'); // redirect to dashboard
    }

    render() {
      return (
            <>
              <div className="login">
                <table>
                  <tbody>
                    <tr>
                      <td>
                                    E-mail:
                      </td>
                      <td>
                                    &nbsp;&nbsp;
                      </td>
                      <td>
                        <input type="text" name="email" value={this.state.email}
                          onChange={({ target: { value } }) => {
                            this.setState({ email: value });
                          }} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                                    Wachtwoord:
                      </td>
                      <td>
                                    &nbsp;&nbsp;
                      </td>
                      <td>
                        <input type="password" name="password"
                          value={this.state.password}
                          onChange={({ target: { value } }) => {
                            this.setState({ password: value });
                          }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                                    &nbsp;
                      </td>
                      <td>
                                    &nbsp;
                      </td>
                      <td>
                        <br />
                        <MuiThemeProvider theme={theme}>
                          <Button variant="contained" color="primary" onClick={this.onSubmit}>
                            Log in
                          </Button>
                        </MuiThemeProvider>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
      );
    }
}
