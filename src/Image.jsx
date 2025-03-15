import {useState, useEffect} from 'react'

function CarouselImage({data, setSelected, selected, index}) {
  const [style, setStyle] = useState({filter: "brightness(50%)"})

  // Highlights the image currently selected

  useEffect(() => {
    if(selected === index) {
      setStyle({filter: "brightness(100%)"})
    } else {
      setStyle({filter: "brightness(50%)"})
    }
  }, [selected])

  return (
    <img style={style} className="sub-image" src={data.photo.medium_url} onClick={() => setSelected(index)}></img>
  )
}

function ImageCarousel({data, setSelected, selected}) {
  const photo_array = data.taxon_photos

    // Maps the first 10 photos retrieved from API

  return (
    <div id="image-carousel">
    {
      photo_array.slice(0, 11).map((data, index) => {
        return (
          <CarouselImage key={index} setSelected={setSelected} selected={selected} data={data} index={index}></CarouselImage>
        )
      })

    }
    </div>
  )

}

export default function Image({taxaId, data}) {
  const [selected, setSelected] = useState(0)

    // One large image for currently selected photo

  let image = data.results[0]
  
    return (
      <div id="image">
          <ImageCarousel setSelected={setSelected} selected={selected} data={image}></ImageCarousel>
          <img src={image.taxon_photos[selected].photo.original_url } alt="image" id="main-image" />

      </div>
    )
}