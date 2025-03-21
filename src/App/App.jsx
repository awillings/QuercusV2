import './App.css'
import useSWR from 'swr'
import {useEffect, useState } from 'react'
import Image from '../Image/Image.jsx'
import Map from '../Map/Map.jsx'
import Information from '../Information/Information.jsx'
import ChildrenList from '../ChildrenList/ChildrenList.jsx'
import Nameplate from '../Nameplate/Nameplate.jsx'

const fetcher = (...args) => fetch(...args).then(res => res.json())
let callsMadeToApi = 0

function retrieveTaxa (id) {
	const { data, error, isLoading } = useSWR(`https://api.inaturalist.org/v1/taxa/${id}`, fetcher)
	console.log(`Retriving data from https://api.inaturalist.org/v1/taxa/. ${callsMadeToApi} made this session`)
	callsMadeToApi = callsMadeToApi + 1;
	return {
		data: data,
		isLoading,
		isError: error
	}
}

function App() {
	const [key, setKey] = useState(48460)
	const {data, isLoading, isError } = retrieveTaxa(key)
	// if (isLoading) return <p>Loading...</p>
	// if (isError) return <p>Error!</p>

	return (
		<div>
			<nav>
				<h1 id="logo">Quercus</h1>
			</nav>
			<div id="page-body">
				<div id="information-panel">
					<div id="title-block">
						<Nameplate isLoading={isLoading} isError={isError} isMain={true} data={data} ></Nameplate>
					</div>
					<div id="information-grid">
						<button onClick={() => setKey(data.results[0].parent_id !== null ? data.results[0].parent_id : 48460 )}>Return to Parent</button>
						<button onClick={() => setKey(48460)}>Return to Life</button>
						<Image isLoading={isLoading} isError={isError} taxaId={key} data={data} ></Image>
						<Information isLoading={isLoading} isError={isError} data={data}></Information>
						<Map isLoading={isLoading} isError={isError} taxaId={key} ></Map>   
					</div>
				</div>
				<ChildrenList isLoading={isLoading} isError={isError} data={data} setKey={setKey}></ChildrenList>
			</div>
		</div>
	)
}

export default App


