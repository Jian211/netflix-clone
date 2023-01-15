import { IMovies } from '../api';
import MovieDetail from './MovieBig';
import {useState, useEffect} from "react";

interface IMovieFormBox {
    movies: IMovies[];
    offset: number,
    index: number
}

const MovieFormBox = ({movies, offset, index}:IMovieFormBox) => {

  return (
    <>
        {movies
            .filter( movie => movie.backdrop_path !== null)
            .slice(offset * index, offset* index + offset )
            .map( movie => (
                <MovieDetail 
                    key={movie.id}
                    movieId={movie.id} 
                    backdropPath={movie.backdrop_path+""}
                    title={movie.title}
                />
        ))}
    </>
  )
}

export default MovieFormBox