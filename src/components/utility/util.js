import React from "react";
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";


//change color of circles 
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };

//for sorting data
export const sortData = (data)=>{
    const sortedData = [...data];
    return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1));
}

//show circles(from leaflet) on map with radius based on number of cases and Popup(from leaflet) to display more information when clicked on circle
export const showDataOnMap = (data, casesType="cases") => (
    data.map(country=>(
        <Circle  id={Math.random().toString(36).substr(2, 9)}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                radius={Math.sqrt(country[casesType]) 
                    * casesTypeColors[casesType].multiplier}
               
        >
            <Popup  id={Math.random().toString(36).substr(2, 9)}>
                <div id={Math.random().toString(36).substr(2, 9)} className="info-container">
                    <div  id={Math.random().toString(36).substr(2, 9)}  className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div id={Math.random().toString(36).substr(2, 9)} className="info-name" >
                        {country.country}
                    </div>
                 
                    <div id={Math.random().toString(36).substr(2, 9)} className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div id={Math.random().toString(36).substr(2, 9)} className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div id={Math.random().toString(36).substr(2, 9)} className="info-deaths">
                    Deaths : {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ))
);

//Prints number in short format for example: 3000 => 3.0 k
export const prettyPrintStat =(stat) =>
stat ? `+${numeral(stat).format("0.0a")}` : "+0";