import React, {useState} from "react";
import {BounceLoader} from "react-spinners";
import {css} from "@emotion/core";
import {Carousel} from "react-bootstrap";
import {v4} from "uuid";

export default function Trailer(params) {
    const {id} = params

    const imgSite = 'https://image.tmdb.org/t/p/w400/'
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=5a96d172a77d1cbc24167ba728949920&language=en`;
    const [images, setImages] = useState();
    const [loading, setLoading] = useState(true)
    const [isCustom, setCustom] = useState(false);


    React.useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.success === false) {
                    setCustom(true)
                    let myMovies = localStorage.getItem("mymovies")
                    myMovies = JSON.parse(myMovies)
                    for (const myMovie of myMovies) {
                        if (myMovie.id === id)
                            setImages(myMovie)
                    }
                }
                else {
                    setImages(data);
                }
                setLoading(false)
            });
    }, [id])



    const override = css`
      display: block;
      margin-top: 5vh;
      margin-left: auto;
      margin-right: auto;
    `;

    if (loading) return (<BounceLoader css={override} color={"#5186ff"} size={300}/>)
    console.log(images.backdrops, isCustom)
    return (
        <>
        {images.backdrops[0] ?
        <Carousel>
            {images.backdrops.map(image => {
                return (
                    <Carousel.Item key={v4()}>
                        {!isCustom ?
                        <img className="d-block w-100" src={imgSite + image.file_path} alt="First slide"/>
                        : <img className="d-block w-100" src={image.value} alt="First slide"/> }
                    </Carousel.Item>
                );
            })}
        </Carousel> : <></>}
            </>
    )
        ;
}