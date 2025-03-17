import './App.css'
import useSWR from 'swr'
import {useEffect, useState } from 'react'
import Image from './Image.jsx'
import Map from './Map.jsx'
import Information from './Information.jsx'
import ChildrenList from './ChildrenList.jsx'

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
	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error!</p>

	return (
		<div>
			<nav></nav>
			<div id="page-body">
				<div id="information-grid">
					<button onClick={() => setKey(data.results[0].parent_id !== null ? data.results[0].parent_id : 48460 )}>Return to Parent</button>
					<button onClick={() => setKey(48460)}>Return to Life</button>
					<Image taxaId={key} data={data} ></Image>
					<Information data={data}></Information>
					<Map taxaId={key} ></Map>   
				</div>
				<ChildrenList data={data} setKey={setKey}></ChildrenList>
			</div>
		</div>
	)
}

export default App


