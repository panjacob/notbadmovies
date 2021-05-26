import React, {createContext, useState, useContext} from "react";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

export default function MovieProvider({children}) {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState();
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=5a96d172a77d1cbc24167ba728949920&page=${page}`);
    const [maxPage, setMaxPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [searchMode, setSearchMode] = useState("most_popular")
    const [keyword, setKeyword] = useState("")
    const [genre, setGenre] = useState(0)


    React.useEffect(() => {
        refresh()
        findMovies()
    }, [url, page, keyword, searchMode, genre])

    const getMyMovies = () => {
        let myMovies = localStorage.getItem("mymovies")
        if (myMovies === undefined || myMovies == null) return []
        else return JSON.parse(myMovies)
    }


    const findMovies = () => {
        setLoading(true)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                data.results = getMyMovies().concat(data.results)
                setMovies(data);
                setMaxPage(data['total_pages'])
                window.scrollTo(0, 0);
                setLoading(false)
                console.log(genre, keyword, searchMode, url)
            });
    }


    const refresh = () => {
        if (searchMode === "genre" && genre !== 0 && genre !== "0")
            setUrl(`https://api.themoviedb.org/3/discover/movie?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US&sort_by=popularity.desc&include_adult=true&page=${page}&with_genres=${genre}`)
        else if (searchMode === "keyword")
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=5a96d172a77d1cbc24167ba728949920&language=en-US&query=${keyword}&page=${page}&include_adult=True`)
        else
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=5a96d172a77d1cbc24167ba728949920&page=${page}`)
    }

    const nextPage = () => {
        if (page + 1 < maxPage)
            setPage(page + 1)
    }

    const previousPage = () => {
        if (page - 1 >= 1)
            setPage(page - 1)
    }

    const goToLastPage = () => {
        setPage(maxPage)
    }

    const goToFirstPage = () => {
        setPage(1)
    }

    const goToPage = (newPage) => {
        setPage(newPage)
    }

    const searchByKeyword = (newKeyword) => {
        setSearchMode("keyword")
        setKeyword(newKeyword)
        setGenre(0)
        setPage(1)
    }

    const searchByGenre = (newGenre) => {
        setSearchMode("genre")
        setGenre(newGenre)
        setKeyword("")
        setPage(1)
    }

    const searchByMostPopular = () => {
        setSearchMode("most_popular")
        setGenre(0)
        setKeyword("")
        setPage(1)
    }


    return (
        <MovieContext.Provider value={{
            movies,
            loading,
            page,
            maxPage,
            keyword,
            genre,
            goToPage,
            nextPage,
            previousPage,
            goToFirstPage,
            goToLastPage,
            searchByKeyword,
            searchByGenre,
            searchByMostPopular,
        }}>
            {children}
        </MovieContext.Provider>
    );
};