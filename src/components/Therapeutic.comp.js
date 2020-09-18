import React from 'react'
import "./Therapeutic.css";

//Draws table displaying therapeutic trials data
function Therapeutic({therapeutic}) {
    return (
        <div className="outside-therapeutic">
          <div className="therapeutic-container">
          <h3>COVID-19 Therapeutic Trials</h3> 
          <div className="thera-table-div">
          <table>
                <thead className="thera-head">
                    <tr>
                        <th key={1}>
                            Medication Class
                        </th>
                        <th key={2}>
                            Trade Name
                        </th>
                        <th key={3}>
                            Researcher
                        </th>
                        <th key={4}>
                            Trial Phase
                        </th>
                        <th key={5}>
                            Last Update
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {therapeutic.map(({medicationClass,tradeName,researcher,trialPhase,lastUpdate})=>(
                        <tr key={Math.random().toString(36).substr(2, 9)}>
                            <td key={Math.random().toString(36).substr(2, 9)}>{medicationClass}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{tradeName.join(", ")}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{researcher.join(", ")}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{trialPhase}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{lastUpdate}</td>
                        </tr>
                    ))}
                </tbody>
          </table>
          </div>
          <a className="source_link" href="https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-therapeutics-tracker" rel="noopener noreferrer" target="_blank">
              View source RAPS website 
          </a>
        </div>
        </div>
    )
}

export default Therapeutic;
