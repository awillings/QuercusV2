import Nameplate from "../Nameplate/Nameplate"

function Child({data, index, setKey}) {

    return (
        <div className="child" onClick={() => setKey(data.id)}>
            <img src={data.default_photo !== null ? data.default_photo.medium_url : ""} alt="" />
            <div className="child-info">
                <Nameplate isMain={false} data={data}></Nameplate>
            </div>
        </div>
    )
}

export default function ChildrenList({data, setKey, isError, isLoading}) {

    if ( data !== undefined && data.results[0].children !== undefined) {
        return (
            <div id="children-container">
                {data.results[0].children.map((data, index) => {
                    return (
                        <Child key={index} data={data} index={index} setKey={setKey}></Child>
                    )
                })
                }
            </div>
        )
    }   
}