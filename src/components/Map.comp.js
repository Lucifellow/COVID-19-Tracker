import React from 'react';
import {Map as LeafletMap, TileLayer} from "react-leaflet";
import "./Map.css"
import {showDataOnMap} from "./utility/util"

//Draws map with circles describing data
function Map({countries, casesType, center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright" rel="noopener noreferrer" target="_blank">OpenStreetMap</a> contributors'
                 noWrap="true"
                 continuousWorld="true" />
                {showDataOnMap(countries,casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map;
