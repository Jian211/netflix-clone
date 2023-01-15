import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { allMoviesState } from "../atoms";
import { useEffect, useState } from "react";
import { IMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import MovieDetail from "../components/MovieDetail";

const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
    position: relative;
    top: 100px;
    padding: 50px 100px;
`;

const Keyword = styled.h2`
    color: gray;
    font-size: 1.3vw;
    padding: 20px 0;
`;

const SmallImg = styled.img`
    width: 16vw;
`;

const MovieTitle = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    
    bottom : 0;
    padding: 100px 0 10px;
    font-weight: 600;
    font-size: large;
    opacity: 0;

    &:hover {
        opacity: 1;
        transition: 0.5s ease-in-out;
    }
    
   

`;

const MovieSmallBox = styled(motion.div)`
    position: relative;
    width: fit-content;
    cursor: pointer;
    box-shadow: 3px 3px 1000px 0.1px gray;
`;

const MovieSmallBoxVariants:Variants = {
    hover:{
        scale: 1.2,
    },
    textInit:{
        opacity: 0
    },
    action: {
        opacity: 1
    }
}

const Overlay = styled(motion.div)`
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
`;

const overlayVariants:Variants = {
    overlay : {
        opacity: 1,
        transition:{
            duration: 1,
            type:"tween",
            ease:"easeOut"
        }
    },
}

function Search () {
    const location = useLocation();
    const keyword = location.search.split("?word=")[1]; 
    const allMovies = useRecoilValue(allMoviesState);
    const [selectedMovies, setSelectedMovies] = useState<IMovies[]>();
    const history = useHistory();
    const movieRoute = useRouteMatch<{id : string}>("/movies/:id");
    const onOverlayClick = () => history.goBack();
    const detailHandler = (movieId:number) => () => history.push(`/movies/${movieId}`);
    useEffect(()=>{
        if(allMovies){
            const searchedMovies = Object.keys(allMovies).map(movieType => {
                const result = allMovies[movieType].results.filter(movie => {
                    return movie.title.includes(keyword);
                })
                return result;
            })
            setSelectedMovies(searchedMovies.reduce((acc, curr) => [...curr, ...acc] , []));
        }
    },[allMovies,keyword])
    return (
        <>
            { !selectedMovies?.length ? 
                <Wrapper>
                    <Keyword>"{keyword}"は存在しないです。</Keyword>
                </Wrapper>
            :
                <Wrapper>
                    <Keyword>"{keyword}"に関連される映画です。</Keyword>
                    {selectedMovies.map(movie => (
                        <MovieSmallBox key={movie.id} variants={MovieSmallBoxVariants} whileHover="hover" onClick={detailHandler(movie.id)}>
                            <SmallImg alt="" src={makeImagePath(movie.backdrop_path,"w500")} />
                            <MovieTitle>{movie.title}</MovieTitle>
                        </MovieSmallBox>
                    ))}
                    {movieRoute && 
                        <AnimatePresence>
                            <Overlay 
                                onClick={onOverlayClick}
                                variants={overlayVariants}
                                animate="overlay"
                            />
                            <MovieDetail 
                                key={movieRoute.params.id}
                                movieId={Number(movieRoute.params.id)}
                                // {...movieDetailProps(Number(movieRoute.params.id))}
                            />
                        </AnimatePresence>
                    }
                </Wrapper>
            }
        </>
    );

}

export default Search;