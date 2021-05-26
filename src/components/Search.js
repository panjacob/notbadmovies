import MovieCards from './search/MovieCards';
import {Container} from 'react-bootstrap'
import Searchbar from "./search/Searchbar";
import FooterPage from "./search/FooterPage";
import React from "react";
import MovieProvider, {useMovies} from "./search/MovieProvider";
import Loader from "./Loader";
import NavbarMain from "./NavbarMain";


function Search() {
    return (
        <MovieProvider>
            <SearchAppNotWrapped/>
        </MovieProvider>
    )
}

function SearchAppNotWrapped() {
    const {loading} = useMovies();
    if (loading) return (<Loader size={400}/>)
    return (
        <div className='App'>
            <Container>
                <Searchbar/>
                <MovieCards/>
                <FooterPage/>
            </Container>
        </div>
    );
}

export default Search;