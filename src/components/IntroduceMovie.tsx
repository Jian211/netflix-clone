import styled from 'styled-components';
import {  IMovies } from '../api';
import MoviesForm from './MoviesForm';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  position: relative; 
  top: -200px;
   h2{
    font-size: 36px;
    margin: 10px 10px 10px 30px;
    font-weight: 500;
   }
`;

interface IntroduceMovieProps {
  movies: IMovies[],
  movieType: string
}


const IntroduceMovie = ( { movies, movieType }: IntroduceMovieProps) => {

  return (
    <Wrapper>
      <h2>{movieType}</h2>
      <MoviesForm movies={movies} />
    </Wrapper> 
  )
}


export default IntroduceMovie