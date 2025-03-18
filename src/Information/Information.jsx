

export default function Information({data}) {

    return(
        <div id="information">
        <p id="wikipedia_summary" dangerouslySetInnerHTML={{__html: data.results[0].wikipedia_summary}}></p>
        <p>Taxa ID: {data.results[0].id}</p>
        </div>
    )
}

