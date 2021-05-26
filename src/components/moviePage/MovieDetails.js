import React from 'react';
import Row from "react-bootstrap/Row";
import StarRating from "./StarRating";
import Trailer from "./Trailer";
import Gallery from "./Gallery";

export default function MovieDetails(props) {
    const {movie} = props;
    let imgSite = 'https://image.tmdb.org/t/p/w200/'
    if (movie.custom === true){
        imgSite = ""
    }
    return (
        <>
            <Row><a href={movie.homepage}><h1>{movie.title} ({movie.release_date.split('-')[0]})</h1></a></Row>
            <Row className={"mt-3"}>
                <div className={"col-sm-4"}>
                    <img className={""} width={"200"} src={imgSite + movie.poster_path} alt={""}/>
                    <p className={"mt-5"}> {movie.overview} </p>
                    <p> Release date: {movie.release_date}</p>
                    <p> Genres: {movie.genres.map(genre => genre.name + ", ")} </p>
                    <p> Production: {movie.production_companies.map(company => {
                        console.log(company)
                        return (company.name + ", ")
                    })} </p>
                    <StarRating movieid = {movie.id}/>

                </div>
                <div className={"col-sm-8 "}>
                    <Gallery id={movie.id} imgSite={imgSite}/>
                    <Trailer id={movie.id}/>
                </div>
            </Row>

        </>

    );
}
