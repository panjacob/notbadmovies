import React from 'react';
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import noimg from '../data/noimg.png'

const MovieCard = (props) => {
    const {movie} = props;
    const imgSite = 'https://image.tmdb.org/t/p/w200/'
    const moviePosterPath = () =>{
        if (movie.poster_path.includes('http'))
            return movie.poster_path
        else return imgSite + movie.poster_path
    }
    return (
        // <Card className={"poster col-6 col-sm-2  "} style={{border: 'none'}}>
        <>
            {
                movie.poster_path ?
                    <Card.Img className={"poster_img"} variant={"top"} src={moviePosterPath()}/> :
                    <Card.Img className={"poster_img"} variant={"top"} src={noimg}/>
            }
            <Card.Body>
                <Link to={`/movie/${movie.id}`}>
                <Card.Title  className={"h6"}>{movie.title}</Card.Title>
                </Link>
            </Card.Body>
         {/*</Card>*/}
        </>

    );
}
export default MovieCard;