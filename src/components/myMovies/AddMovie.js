import React, {useState} from 'react';
import {Form, Row, Col, Container, Button, Carousel} from 'react-bootstrap'
import {UseInput} from "../search/Hooks";
import {Redirect} from 'react-router-dom';


export default function AddMovie() {
    const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US'
    const [loading, setLoading] = useState(true)
    const [genres, setGenres] = useState()
    const [titleProps] = UseInput("");
    const [posterProps] = UseInput("");
    const [releaseDateProps] = UseInput("")
    const [descriptionProps] = UseInput("")
    const [genreProps] = UseInput("")
    const [productionProps] = UseInput("")
    const [trailerProps] = UseInput("")
    const [galleryProps1] = UseInput("")
    const [galleryProps2] = UseInput("")
    const [galleryProps3] = UseInput("")
    const [redirect, setRedirect] = useState(false)


    React.useEffect(() => {
        fetch(genreUrl)
            .then((res) => res.json())
            .then((data) => {
                setGenres(data)
                setLoading(false)
            });
    }, [])

    const submit = () => {
        let galleryPhotos = []
        if (galleryProps1.value !== "") galleryPhotos.push(galleryProps1)
        if (galleryProps2.value !== "") galleryPhotos.push(galleryProps2)
        if (galleryProps3.value !== "") galleryPhotos.push(galleryProps3)
        let newMovie = {
            "custom": true,
            "id": titleProps.value,
            "title": titleProps.value,
            "poster_path": posterProps.value,
            "release_date": releaseDateProps.value,
            "overview": descriptionProps.value,
            "genres": [{name: genreProps.value}],
            "production_companies": [{name: productionProps.value}],
            "backdrops": galleryPhotos,
            "trailer": [{key: trailerProps.value}]
        }
        console.log(newMovie)
        let myMovies = localStorage.getItem("mymovies")
        if (myMovies === undefined || myMovies == null) myMovies = []
        else myMovies = JSON.parse(myMovies)
        myMovies.push(newMovie)
        localStorage.setItem("mymovies", JSON.stringify(myMovies))
        setRedirect(true)


    }

    if (redirect) return (<Redirect to='/mymovies/show'/>)
    else if (loading) return (<></>);
    else return (
            <>
                <Container>
                    <Row className={"mt-5"}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Poster url ex. <b
                                    className={"text-info"}>https://img.moviepostershop.com/replicas-movie-poster-2019-1020778791.jpg</b></Form.Label>
                                <Form.Control {...posterProps} size="md" type="text" placeholder="url"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control {...titleProps} size="md" type="text" placeholder="Title"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Release date</Form.Label>
                                <Form.Control {...releaseDateProps} size="md" type="date"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control {...descriptionProps} as="textarea" rows={5}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control {...genreProps} as="select">
                                    {genres.genres.map(genre => <option value={genre.name}> {genre.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Production</Form.Label>
                                <Form.Control {...productionProps} size="md" type="text" placeholder="Production"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> Youtube embed key: ex. https://www.youtube.com/embed/<b
                                    className={"text-info"}>XW2E2Fnh52w</b></Form.Label>
                                <Form.Control {...trailerProps} size="md" type="text" placeholder="Youtube Embed key"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gallery photos ex.
                                    <b className={"text-info"}> https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB19HFom.img?h=416&w=799&m=6&q=60&u=t&o=f&l=f&x=493&y=156</b></Form.Label>
                                <Form.Control {...galleryProps1} size="md" type="text" placeholder="url 1"/>
                                <Form.Control {...galleryProps2} size="md" type="text" placeholder="url 2"/>
                                <Form.Control {...galleryProps3} size="md" type="text" placeholder="url 3"/>
                            </Form.Group>
                            <Button onClick={() => submit()} variant={"dark"}>Add</Button>

                        </Col>
                        <Col>
                            <Form.Group className={"d-flex justify-content-center"}>
                                {posterProps.value !== "" ?
                                    <img className={""} src={posterProps.value} alt={""}/> : <></>}
                            </Form.Group>
                            <Form.Group>
                                {galleryProps1.value !== "" ?
                                    <Carousel className={"mt-3 w-100"}>
                                        <Carousel.Item>
                                            <img className="d-block w-100" src={galleryProps1.value} alt=""/>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img className="d-block w-100" src={galleryProps2.value} alt=""/>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img className="d-block w-100" src={galleryProps3.value} alt=""/>
                                        </Carousel.Item>
                                    </Carousel> : <></>}
                                {trailerProps.value !== "" ?
                                    <iframe className={"mt-5"} width={"100%"} height={"400em"} title={"trailer"}
                                            src={`https://www.youtube.com/embed/${trailerProps.value}`}>
                                    </iframe> : <></>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </>
        );
}
