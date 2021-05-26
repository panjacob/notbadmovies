import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {AiFillPlayCircle} from "react-icons/ai";
import {Link} from "react-router-dom";


export default function NavbarMain() {
    return (
        <Navbar collapseOnSelect expand="lg"  variant="dark">
            <Navbar.Brand className={"col-3"} href="/">
                <AiFillPlayCircle className={"mr-3"} size={"2em"}/>
                NotBadMovies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className={"nav-link"} to={`/`}>Most popular</Link>
                    <Link className={"nav-link"} to={`/mymovies/add`}>Add Movie</Link>
                    <Link className={"nav-link"} to={`/mymovies/show`}>My movies</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
