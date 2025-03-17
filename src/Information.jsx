

export default function Information({data}) {

    return(
        <div id="information">
        <h1 style={{textTransform: "capitalize"}}>{data.results[0].preferred_common_name !== undefined ? `${data.results[0].preferred_common_name} (${data.results[0].name})` : `${data.results[0].name}`}</h1>
        <p id="wikipedia_summary" dangerouslySetInnerHTML={{__html: data.results[0].wikipedia_summary}}></p>
        <p>Taxa ID: {data.results[0].id}</p>
        </div>
    )
}

