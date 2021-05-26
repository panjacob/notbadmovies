import React, {useState} from 'react';
import MovieCard from '../search/MovieCard';
import Row from 'react-bootstrap/Row'
import {v4} from "uuid";
import {Button, Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function MyMovies() {
    const [movies, setMovies] = useState([])

    const getMovies = () => {
        let myMovies = localStorage.getItem("mymovies")
        if (myMovies === undefined || myMovies == null) setMovies([])
        else return setMovies(JSON.parse(myMovies))
    }

    React.useEffect(() => {
        getMovies()
    }, [])


    const removeMovie = (id) => {
        const newMovies = movies.filter(movie => {
            return  movie.id !== id
        })
        setMovies(newMovies)
        localStorage.setItem("mymovies", JSON.stringify(newMovies))
    }

    if (!movies || movies.length === 0) return <h1>No movies, sorry</h1>;
    else
        return (
            <Container className={"mt-5"}>
                <Row>
                    {movies.map((movie) => {
                        return (
                            <Card className={"poster col-6 col-sm-2  "} style={{border: 'none'}}>
                                <Button className={"w-100 btn btn-danger"} onClick={() => removeMovie(movie.id)}>Remove</Button>
                                <MovieCard key={v4()} movie={movie}/>
                            </Card>)
                    })}
                </Row>
            </Container>
        );
};
