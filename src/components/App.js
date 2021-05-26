import React from "react";
import Search from "./Search"
import MoviePage from "./moviePage/MoviePage"
import AddMovie from "./myMovies/AddMovie"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import '../App.scss';
import NavbarMain from "./NavbarMain";
import MyMovies from "./myMovies/MyMovies";

export default function App() {
    return (
        <>
            <Router>
                <NavbarMain/>
                <Switch>
                    <Route path={"/mymovies/show"} component={MyMovies}/>
                    <Route path={"/mymovies/add"} component={AddMovie}/>
                    <Route path={"/movie/:id"} component={MoviePage}/>
                    <Route path={"/"} component={Search}/>
                </Switch>
            </Router>
        </>
    )
}


