import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <tr>
                    <td>
                        E-mail:
                    </td>
                    <td>
                        &nbsp;&nbsp;
                    </td>
                    <td>
                        <input type="text" name="email" value="@htg.nl" />
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
                        <input type="text" name="password" value="" />
                    </td>
                </tr>
            </div>
        );
    }
}