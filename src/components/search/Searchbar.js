import React from 'react';
import {Form} from "react-bootstrap";
import {useMovies} from "./MovieProvider";
import {UseInput} from "./Hooks";
import GenreOptions from "./GenreOptions";


export default function Searchbar() {
    const {searchByKeyword, searchByGenre, keyword, genre} = useMovies();
    const [keywordProps] = UseInput(keyword);
    const [genreProps] = UseInput(genre);

    const submitKeyword = e => {
        e.preventDefault();
        searchByKeyword(keywordProps.value)
    };

    const submitGenre = e => {
        e.preventDefault();
        console.log('Genre submit')
        searchByGenre(genreProps.value)
    };

    return (
        <>
            <Form onSubmit={submitKeyword} className={"mb-5"}>
                <input {...keywordProps} type="text" className={"form-control form-control-lg w-100"}
                       placeholder="Find not a bad movie...."/>
                <select onClick={submitGenre} {...genreProps} className="form-control">
                    <GenreOptions/>
                </select>
            </Form>

        </>
    );
}
