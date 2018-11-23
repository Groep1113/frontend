import {Component} from "react";
import {withRouter} from "react-router-dom";
import React from "react";
import {createTable} from "../App";
import './register.css';

const firstRowTable = ["Product", "Type", "Locatie", "Leverancier"];
const query = [["printer 1", "printer", "5G", "bol.com"], ["desktop 1", "desktop", "4G", "amazon"],["scanner 1", "scanner", "3G", "coolblue"]];

@withRouter
export default class Register extends Component {

  render() {
    return (
      <div className="register">
        {createTable(firstRowTable, query)}
      </div>
    );
  }
}