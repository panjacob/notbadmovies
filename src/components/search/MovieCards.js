import React from 'react';
import MovieCard from './MovieCard';
import Row from 'react-bootstrap/Row'
import {useMovies} from "./MovieProvider";
import {v4} from "uuid";
import Card from "react-bootstrap/Card";

export default function MovieCards() {
    const {movies} = useMovies();

    if (!movies || movies.length === 0) return <h1>No movies, sorry</h1>;
    else if (movies.results === undefined) return <h1>Error from API</h1>;
    else
        return (
            <Row>
                {movies.results.map((movie) => {
                    return (<Card className={"poster col-6 col-sm-2  "} style={{border: 'none'}}>
                        <MovieCard key={v4()}  movie={movie}/>
                    </Card>)
                })}
            </Row>
        );
};
