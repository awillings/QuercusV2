export default function Nameplate({data, isMain, isLoading, isError}) {
    if(isLoading || isError) {
        return <h1>Data Loading...</h1>
    } else {
        if(isMain) {
            if(data.results[0].preferred_common_name !== undefined) {
                return (
                    <>
                        <h1 id="title">{isLoading || isError ? "" : data.results[0].preferred_common_name}</h1>
                        <h2 id="subtitle">({isLoading || isError ? "" : data.results[0].name})</h2>
                    </>
                )
            }
            return <h1 id="title">{isLoading || isError ? "" : data.results[0].name}</h1>
        } else {
            if(data.preferred_common_name !== undefined ) {
                return (
                    <>
                        <h2>{data.preferred_common_name}</h2>
                        <h3>({data.name})</h3>
                    </>
                )
            }
            return <h2>{data.name}</h2>
        }
    }
}

