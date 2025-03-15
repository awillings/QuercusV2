import './App.css'
import useSWR from 'swr'
import { use, useEffect, useState } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Image from './Image.jsx'

const fetcher = (...args) => fetch(...args).then(res => res.json())
let API_CALLS = 0

function retrieveTaxa (id) {
  const { data, error, isLoading } = useSWR(`https://api.inaturalist.org/v1/taxa/${id}`, fetcher)
 
  console.log(`Retriving data from https://api.inaturalist.org/v1/taxa/. ${API_CALLS} made this session`)
  API_CALLS++;

  return {
    data: data,
    isLoading,
    isError: error
  }
}

function App() {
  const [key, setKey] = useState(48460)
  const {data, isLoading, isError } = retrieveTaxa(key)
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error!</p>


  return (
    <div>
      <nav></nav>
      <Image taxaId={key} data={data} ></Image>
    </div>
  )
}

export default App


