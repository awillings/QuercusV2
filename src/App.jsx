import './App.css'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function retrieveData (id) {
  const { data, error, isLoading } = useSWR(`https://api.inaturalist.org/v1/taxa/${id}`, fetcher)
 
  return {
    data: data,
    isLoading,
    isError: error
  }
}

function retrieveChildren (id) {
  const { data, error, isLoading } = useSWR(`https://api.inaturalist.org/v1/taxa?parent_id=${id}`, fetcher)
 
  return {
    data: data,
    isLoading,
    isError: error
  }
}

// function retrieveMap (id) {
//   const { data, error, isLoading } = useSWR(`https://api.inaturalist.org/v1/colored_heatmap/0/0/0.png?taxon_id=${taxaId}`, fetcher)
//   return {
//     data: data,
//     isLoading,
//     isError: error
//   } 
// }

// function Map ({ taxaId, setKey }) {
//   const {data, isLoading, isError} = retrieveMap(taxaId)
//   if (isLoading) return <p>Loading...</p>
//   if (isError) return <p>Error!</p>

//   return (
//     <div className='map'>

//     </div>
//   )
// }

function Parent ({ taxaId, setKey }) {
  const {data, isLoading, isError } = retrieveData(taxaId)
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error!</p>

  let parentData = data.results[0]
  
  return (
    <div className="group">
      <img src={parentData.default_photo.medium_url} alt="" onClick={() => setKey(parentData.parent_id)}/>
      <p>{parentData.preferred_common_name}</p>
      <p>({parentData.name})</p>
      <p style={{fontSize:"75%"}}>{parentData.id}</p>
      <p dangerouslySetInnerHTML={{__html: parentData.wikipedia_summary}}></p>
    </div>
  )
}

function Wikipedia ({ data }) {
  if(data.wikipedia_url === null || data.wikipedia_url === undefined) {
    return (
      <p>No Wikipedia Page Found</p>
    )
  } else {
    return (
      <p><a href={data.wikipedia_url}>Wikipedia</a></p>
    )
  }
}

function Children ({ taxaId, setKey }) {
  const {data, isLoading, isError } = retrieveChildren(taxaId)
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error!</p>

  let childrenData = []

  for(let i = 0; i < data.results.length; i++) {
    childrenData.push(data.results[i])
    if(childrenData[childrenData.length - 1].default_photo === null) {
      childrenData[childrenData.length - 1].default_photo = "";
    }
  }
  
  return (
    <>
      {
        childrenData.map(function(data) {
          return (
            <div className="group" style={{border: data.extinct ? "1px solid red" : "1px solid blue"}}>
              <img src={data.default_photo.medium_url} onClick={() => setKey(data.id)}></img>
              <p>{data.preferred_common_name}</p> 
              <p>({data.name})</p>
              <Wikipedia data={data}></Wikipedia>
              <p style={{fontSize:"75%"}}>{data.id}</p>
            </div>
          )
        })
      }
    </>
  )
}

function App() {
  const [key, setKey] = useState(48460)


  return (
    <>
      <div className='container'>
        <Parent taxaId={key} setKey={setKey}></Parent>
        <Children taxaId={key} setKey={setKey}></Children> 
      </div>
      <div className='containerTwo'>
      <MapContainer center={[51.505, -0.09]} zoom={0} scrollWheelZoom={true} id="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.inaturalist.org/v1/heatmap/{z}/{x}/{y}.png?acc=true&captive=false&identified=true&verifiable=true&taxon_id=${key}`}
          />
        </MapContainer>
      </div>
    </>
  )
}

export default App


