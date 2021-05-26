import React, {useState} from 'react';
import {v4} from "uuid";
import {useMovies} from "./MovieProvider";


export default function GenreOptions() {
    const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US'
    const {genre} = useMovies();

    const [loading, setLoading] = useState(true)
    const [genres, setGenres] = useState();

    React.useEffect(() => {
        fetch(genreUrl)
            .then((res) => res.json())
            .then((data) => {
                setGenres(data);
                setLoading(false)
            });
    }, [])

    if (loading) return (<></>);
    else return (<>
        {genre === 0 ? <option selected value="0">Everything</option> : <option value="0">Everything</option>}
        {genres.genres.map(genre => {
                return (
                    genre === genre.id ?
                        <option selected key={v4()} value={genre.id}>{genre.name}</option> :
                        <option key={v4()} value={genre.id}>{genre.name}</option>
                )
            }
        )}

    </>)
}
