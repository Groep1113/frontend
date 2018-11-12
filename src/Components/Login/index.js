import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';

@withRouter
export default class Login extends Component {
    state = { email:"@bs-htg.nl", password:"" };
    onSubmit = this.onSubmit.bind(this)

    onSubmit(event) {
      event.preventDefault();
      localStorage.setItem("loggedIn", true);
      const { email, password } = this.state;
      localStorage.setItem("BasicAuth", btoa(`${email}:${password}`));
      this.props.history.push("/"); // redirect to dashboard
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
                                        onChange={({ target: {value} }) => {
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
                                      onChange={({ target: {value} }) => {
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
                                    <input type="submit" className="ok" value="Log in"
                                      onClick={this.onSubmit} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}
