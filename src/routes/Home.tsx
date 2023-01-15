import styled from "styled-components";
import { makeImagePath } from "../utils"
import Banner from "../components/Banner";
import IntroduceMovie from "../components/IntroduceMovie";
import { getMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { useState, useEffect} from "react";
import MovieDetailForm from "../components/MovieDetailForm";

const Wrapper = styled.div`
    overflow-x: hidden;
    background-color: black;
`;

const Loading = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IAllMovies {
  [key: string] : IGetMoviesResult , 
}

function Home () {
   
    const {data , isLoading} = useQuery<IGetMoviesResult>(["movies","nowPlaying"], getMovies);
    const {data: topRateMovies} = useQuery<IGetMoviesResult>(["movies","topRated"],getTopRatedMovies);
    const {data: upcomingMovies} = useQuery<IGetMoviesResult>(["movies","upcoming"],getUpcomingMovies);
    const {data: popularMovies} = useQuery<IGetMoviesResult>(["movies","popular"],getPopularMovies);


    const [allMovies, setAllMovies] = useState<IAllMovies>();
    const bannerProps = {
      backdropPath : makeImagePath(data?.results[0].backdrop_path+""),
      title: data?.results[0].title+"",
      overview: data?.results[0].overview+""
    }

    useEffect(()=>{
      if(topRateMovies && upcomingMovies && popularMovies){
        setAllMovies({
            topRated: topRateMovies, 
            upcoming : upcomingMovies,
            popular: popularMovies,
          });
      }
    },[topRateMovies, upcomingMovies, popularMovies]);

    return (
        <Wrapper>
          {isLoading ? <Loading>Loading</Loading> : 
            <>
              <Banner {...bannerProps} />

              {allMovies && 
                Object.keys(allMovies).map( movieType => (
                  <IntroduceMovie 
                    key={movieType} 
                    movies={allMovies[movieType].results}
                    movieType={movieType}
                  /> 
                ))
              }

              { allMovies && <MovieDetailForm /> }
            </>
          }
        </Wrapper>
    );

}

export default Home;