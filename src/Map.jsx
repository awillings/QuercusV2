import {useState} from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export default function Map({taxaId}) {

    return (
        <div id="map-container">
            <MapContainer center={[0, 0]} zoom={0} scrollWheelZoom={true} id="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={`https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?acc=true&captive=false&identified=true&verifiable=true&taxon_id=${taxaId}`}
                    />
                </MapContainer>
        </div>
    )
}