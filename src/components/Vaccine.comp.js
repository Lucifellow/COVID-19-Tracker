import React from 'react'
import "./Vaccine.css"


//Displays table showing vaccine data trials
function Vaccine({vaccine}) {
    return (
        <div className="vaccine-container">
          <h3>COVID-19 Vaccine Trials</h3> 
          <div className="vac-table-div">
          <table>
                <thead className="table-head">
                    <tr>
                        <th key={1}>
                            Candidate
                        </th>
                        <th key={2}>
                            Mechanism
                        </th>
                        <th key={3}>
                            Trial Phase
                        </th>
                        <th key={4}>
                            Institution
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vaccine.map(({candidate,mechanism,trialPhase,institutions})=>(
                        <tr key={Math.random().toString(36).substr(2, 9)}>
                            <td key={Math.random().toString(36).substr(2, 9)}>{candidate}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{mechanism}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{trialPhase}</td>
                            <td key={Math.random().toString(36).substr(2, 9)}>{institutions.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
          </table>
          </div>
          <a className="source_link" href="https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker" rel="noopener noreferrer" target="_blank">
              View source RAPS website</a>
        </div>
    )
}


export default Vaccine;
