import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetail from "../components/MovieDetail";


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


const MovieDetailForm = () => {
    const history = useHistory();
    const onOverlayClick = () => history.goBack();
    const movieRoute = useRouteMatch<{id : string}>("/movies/:id");

    // const movieDetailProps = (id:number) => {
    //   if(allMovies){
    //     const selectedMovie = Object.keys(allMovies)
    //     .map( movieType => allMovies[movieType].results.filter( movie => movie.id === id))
    //     .filter( movieType => movieType.length > 0)[0][0];
    //     const {id:movieId, overview,original_title,backdrop_path, title } = selectedMovie; 
    //     const movieImg = makeImagePath(backdrop_path,"w500");
    //     return {movieId,original_title, movieImg, overview, title};
    //   }
    // }
    return (
        <>
        {movieRoute && 
            <AnimatePresence>
                <>
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
                </>
            </AnimatePresence>
        }
        </>
    )
}

export default MovieDetailForm