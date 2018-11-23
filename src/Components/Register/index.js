import {Component} from "react";
import {withRouter} from "react-router-dom";
import React from "react";
import './register.css';

const firstRowTable = ["Product", "Type", "Locatie", "Leverancier"];
const query = [["printer 1", "printer", "5G", "bol.com"], ["desktop 1", "desktop", "4G", "amazon"],["scanner 1", "scanner", "3G", "coolblue"]];

@withRouter
export default class Register extends Component {

  render() {
    return (
      <div className="register">
        {tableCreate()}
      </div>
    );
  }
}

function tableCreate(){
  let body = document.body,
    tbl  = document.createElement('table');
  tbl.setAttribute('className', 'registerTable');
  tbl.style.width='60%';
  tbl.style.marginLeft= '5%';
  tbl.style.marginTop = '10%';

  for(let i = 0; i < query.length+1; i++){ // diepte
    let tr = tbl.insertRow();
    tr.style.height = "2em";
    for(let j = 0; j < firstRowTable.length; j++){ // breedte
      if(i==0){
        let td = tr.insertCell();
        td.appendChild(document.createTextNode(firstRowTable[j]))
        td.style.backgroundColor = "#a5bff5";
      } else {
        let td = tr.insertCell();
        td.appendChild(document.createTextNode(query[i-1][j]))
        if (i%2 == 0) {
          td.style.backgroundColor = "#d5d5d5";
        } else {
          td.style.backgroundColor = "#f6f6f6";
        }
      }
    }
  }
  body.appendChild(tbl);
}
