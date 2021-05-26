import React, {useState} from "react";
import Loader from "../Loader";


export default function Trailer(params) {
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US`;
    const [trailer, setTrailer] = useState();
    const [loading, setLoading] = useState(true)


    React.useEffect(() => {
        findTrailer()
    }, [])


    const findTrailer = () => {
        setLoading(true)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.success === false) {
                    let myMovies = localStorage.getItem("mymovies")
                    myMovies = JSON.parse(myMovies)
                    for (const myMovie of myMovies) {
                        if (myMovie.id === id) {
                            const newTrailers = {results: myMovie.trailer};
                            setTrailer(newTrailers)
                        }
                    }
                } else {
                    setTrailer(data);
                }
                setLoading(false)
            });
    }

    if (loading) return (<Loader size={300}/>)
    return (
        <>
            {trailer.results[0] ?
                <iframe className={"mt-5"} width={"100%"} height={"400em"} title={"trailer"}
                        src={`https://www.youtube.com/embed/${trailer.results[0].key}`}>
                </iframe> : <></>}
        </>
    );
}