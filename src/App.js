import React, { useEffect, useState } from 'react';
import {MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core";
import InfoBox from "./components/InfoBox.comp";
import Map from "./components/Map.comp";
import Table from "./components/Table.comp";
import {sortData, prettyPrintStat} from "./components/utility/util";
import './App.css';
import LineGraph from "./components/LineGraph.comp";
import Vaccine from "./components/Vaccine.comp";
import Therapeutic from "./components/Therapeutic.comp";
import "leaflet/dist/leaflet.css";

function App() {

  const[countries, setCountries] = useState([]);          //to store data of different countries
  const[country,setCountry] = useState("worldwide");      //to display currently selected country from drop-down
  const [countryInfo, setCountryInfo] = useState({});     //get covid-info for the selected country
  const [tableData, setTableData] = useState([]);         //data to display live cases based on country 
  const [mapCenter, setMapCenter] = useState({lat: 39.80746, lng:0.4796});  //center the map based on country
  const [mapZoom, setMapZoom] = useState(2);               //set zoom for map
  const [mapCountries, setMapCountries] = useState([]);   //country on map
  const [casesType, setCasesType] = useState("cases");    //Live corona cases
  const [vaccine, setVaccine] = useState([]);             //Covid-19 vaccine trial data
  const [therapeutic, setTherapeutic] = useState([]);     //Covid-19 therapeutic trial data

  //gets all country info
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[])

  //gets,extracts, and assigns covid-19 therapeutic trial data to therapeutic state
  useEffect(()=>{
    const getTherapeuticData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/therapeutics")  //disease.sh api 
      .then((response)=>response.json())
      .then((info)=>{
        const therapeutics = info.data.map((thera)=>(
          {
            medicationClass: thera.medicationClass,
            tradeName: thera.tradeName,
            researcher: thera.developerResearcher,
            trialPhase: thera.trialPhase,
            lastUpdate: thera.lastUpdate,
          }));
          setTherapeutic(therapeutics)
      });
    };
    getTherapeuticData();
  },[])

  //gets,extracts, and assigns covid-19 vaccine trial data to vaccine state
  useEffect(()=>{
    const getVaccineData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/vaccine")
      .then((response)=>response.json())
      .then((info)=>{
        const vaccine = info.data.map((vac)=>(
          {
            candidate: vac.candidate,
            mechanism: vac.mechanism,
            trialPhase: vac.trialPhase,
            institutions: vac.institutions,
          }));
          setVaccine(vaccine);
      });
    };
    getVaccineData();
  },[])

  //gets all country data, sorts it and assigns to tableData,mapCountries (unsorted),and countries(unsorted) state
  useEffect(()=>{
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
      });
    };
    getCountriesData();
  },[])

  //checks currently selected country and changes states
  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;

    const url = 
      (countryCode=== "worldwide")
      ? "https://disease.sh/v3/covid-19/all"
      :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
      if(countryCode==="worldwide"){
        setMapCenter([39.80746,10.4796]);
        setMapZoom(2);
      }else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
    });
  };

  return (
    <div className="app">
      <div className="app_top">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>

          {/** Adding Material UI form control, select, menuItem for dropdown to select countries */}
            <FormControl className="app_dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map((country) => (
                  <MenuItem key={Math.random().toString(36).substr(2, 9)} value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
        </div>

          {/** Infobox to display cases, recovered, deaths in currently selected country */}
        <div className="app_stats"  >
          <InfoBox
            isRed
            onClick={(e) => setCasesType("cases")} 
            active = {casesType ==="cases"}
            title="Corona Cases Today:" 
            cases = {prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox 
            onClick={(e) => setCasesType("recovered")} 
            active = {casesType ==="recovered"}
            title="Recovered Today:" 
            cases = {prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox 
            isRed
            onClick={(e) => setCasesType("deaths")}
            active = {casesType ==="deaths"}
            title="Deaths Today:" 
            cases = {prettyPrintStat(countryInfo.todayDeaths)} 
            total = {prettyPrintStat(countryInfo.deaths)}/>
        </div>
        {/** Adds map with circles and popup */}
        <Map casesType={casesType} countries={mapCountries} center = {mapCenter} zoom={mapZoom}/>
      </div>
      {/** Material UI card with cardcontent to display table of live cases and a line graph */}
      <Card className="app_right">
          <CardContent>
            <h3>
              Live Cases by Country
              <Table countries={tableData}/>
            </h3>
            <h3 className="app_right_line_head">
              Worldwide new {casesType}
            </h3>
            <LineGraph className="app_graph" casesType={casesType}/>
          </CardContent>
      </Card>
      </div>
      {/** container to display vaccine and therapeutic trials */}
      <div  className="app_bottom">
        <div className="app_vaccine">  
          <Vaccine vaccine={vaccine}/>
        </div>
        <div className="app_therapeutic">
          <Therapeutic therapeutic={therapeutic} />
        </div>
      </div>
    </div>
  );
}

export default App;
