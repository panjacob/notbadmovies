import ContainerBootstrap from 'react-bootstrap/Container'
import React, {useState} from "react";
import MovieDetails from "./MovieDetails";
import Loader from "../Loader";
import Comments from "./Comments"


export default function MoviePage({match}) {

    let id = match.params.id
    const [movie, setMovie] = useState();
    const url = useState(`https://api.themoviedb.org/3/movie/${id}?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US`);
    const [loading, setLoading] = useState(true)


    React.useEffect(() => {
        findMovie()
    }, [])


    const findMovie = () => {
        setLoading(true)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.success === false) {
                    let myMovies = localStorage.getItem("mymovies")
                    myMovies = JSON.parse(myMovies)
                    for (const myMovie of myMovies) {
                        if (myMovie.id === id)
                            setMovie(myMovie)
                    }
                } else {
                    setMovie(data);
                }

                setLoading(false)
            });
    }


    if (loading) return (<Loader size={400}/>)

    return (
        <div>
            <ContainerBootstrap>
                <MovieDetails movie={movie}/>
                <Comments movieid={movie.id}/>
            </ContainerBootstrap>
        </div>
    )
        ;
}