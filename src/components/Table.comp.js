import React from 'react';
import "./Table.css";
import numeral from "numeral";

//draws table displaying live data
function Table({countries}) {
    return (
        <div className="table">
        <table>
        <tbody>       
          {countries.map(({country,cases}) => (
            <tr key={Math.random().toString(36).substr(2, 9)}>
              <td key={Math.random().toString(36).substr(2, 9)}>{country}</td>
              <td key={Math.random().toString(36).substr(2, 9)}>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
        
          ))}
          </tbody>
          </table>
        </div>
      );
}

export default Table;
