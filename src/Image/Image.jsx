import {useState, useEffect} from 'react'

function CarouselImage({data, setSelected, selected, index}) {
    const [style, setStyle] = useState({filter: "brightness(50%)"})
    // Highlights the image currently selected
    useEffect(() => {
        selected === index ? setStyle({filter: "brightness(100%)"}) : setStyle({filter: "brightness(50%)"})
    }, [selected])
    return (
        <img style={style} className="sub-image" src={data.photo.square_url} onClick={() => setSelected(index)}></img>
    )
}

function ImageCarousel({data, setSelected, selected, isLoading, isError}) {
    if(isLoading || isError) {
        return <div id="image-carousel"></div>
    }
    // Maps the first 10 photos retrieved from API      
    const photo_array = data.taxon_photos
    return (
        <div id="image-carousel">
            {photo_array.slice(0, 11).map((data, index) => {
                return (
                    <CarouselImage key={index} setSelected={setSelected} selected={selected} data={data} index={index}></CarouselImage>
                )
            })}
        </div>
    )
}

export default function Image({taxaId, data, isLoading, isError}) {
    const [selected, setSelected] = useState(0)
    // One large image for currently selected photo
    if(isLoading || isError) {
        return (
            <div id="image" className='information-cluster-child'>
                <ImageCarousel isLoading={isLoading} isError={isError} setSelected={setSelected} selected={selected}></ImageCarousel>
                <img src="" id="main-image" />          
            </div>
        )
    }
    let image = data.results[0]
    return (
        <div id="image" className='information-cluster-child'>
            <ImageCarousel setSelected={setSelected} selected={selected} data={image}></ImageCarousel>
            <img src={image.taxon_photos[selected] !== undefined ? image.taxon_photos[selected].photo.original_url : "" } id="main-image" />          
        </div>
    )
}