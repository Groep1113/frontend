import React, { Component } from 'react';
import './welcome.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="welcome">
                <tr>
                    <td>
                        Voornaam:
                    </td>
                    <td>
                        &nbsp;&nbsp;
                    </td>
                    <td>
                        ---- Hier nog voornaam neerzetten -----
                    </td>
                </tr>
                <tr><br/></tr>
                <tr>
                    <td>
                        Achternaam:
                    </td>
                    <td>
                        &nbsp;&nbsp;
                    </td>
                    <td>
                        ---- Hier nog achternaam neerzetten -----
                    </td>
                </tr>
                <tr><br/></tr>
                <tr>
                    <td>
                        Email:
                    </td>
                    <td>
                        &nbsp;&nbsp;
                    </td>
                    <td>
                        ---- Hier nog email neerzetten -----
                    </td>
                </tr>
                <tr><br/></tr>
                <tr>
                    <td>
                        Rol:
                    </td>
                    <td>
                        &nbsp;&nbsp;
                    </td>
                    <td>
                        ---- Hier nog rol neerzetten -----
                    </td>
                </tr>
            </div>
        );
    }
}