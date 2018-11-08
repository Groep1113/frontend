import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {
    state = { email:"@htg.nl", password:"" };
    render() {
        return (
            <>
                <div className="title">
                    <b>Login pagina</b>
                </div>
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
                                    <input type="password" name="password" value={this.state.password}
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
                                    <input type="submit" name="ok" value="OK" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}