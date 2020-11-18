import React, {useState} from "react"
import MovieCard from "./movieCard"

export default function SearchMovies() {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])

    const searchMovies = async (event) => {
      event.preventDefault();
      console.log("submitting")
  
      const url = `https://api.themoviedb.org/3/search/movie?api_key=c9aed3aeff0284e7e5a684308cc4a7eb&language=en-US&query=
      ${query}&page=1&include_adult=false`

      try {
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results)
        console.log(data)
      }catch(error) {
        console.log(error)
      }
    }

    function onChangeHandler(event) {
      setQuery(event.target.value)
    }

    return (
      <>
        <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">Movie</label>
        <input className="input" type="text" name="query"
        placeholder="i.e. Donnie Brasco"
        value={query} onChange={onChangeHandler}
        />
        <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
              <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
      </>
    )
  }