import {useQuery} from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils"
import { motion, Variants, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

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

const Banner = styled.div<{bgImage: string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.7)) ,
                      url(${props => props.bgImage});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 70px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 26px;
    width: 40%;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
    margin: 0 10px;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    gap: 20px;
    margin-bottom: 10px;
    position: absolute;
`;
const Box = styled(motion.div)<{bgimage: string}>`
  background-color: white;
  height: 200px;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  background-position: center center;
  font-size: 40px;

  &:first-child{
    transform-origin: center left;
  }

  &:last-child{
    transform-origin: center right;
  }
`

const Info = styled(motion.div)`
  width: 100%;
  position: absolute;
  padding: 10px;
  bottom: 0;
  opacity: 0;
  
  h4{
    font-size: 20px;
    text-align: center;
    color: white;
    text-shadow:  #8c8b8a 10px 0 10px;
  }
`;

const Overlay = styled(motion.div)`
  background-color: rgba(0,0,0,0.7);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const BigBox = styled(motion.div)`
  background-color: red;
  width: 60vw;
  height: 60vh;
  position:fixed;
  top: 100px;
  left:0;
  right:0;
  margin: auto;
`;

const rowVariants:Variants = {
  hidden: {
    x: window.outerWidth+ 450,
  },
  visible:{
    x: 0,
  },
  exit: {
    x: -window.outerWidth + -450,
  },
}

const offset = 6;

const boxVariants:Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -50,
    transition:{
      delay: 0.3,
      type:"tween",
      ease:"easeInOut"
    }
  },
} 

const infoVariants:Variants ={
  hover : {
    opacity: 1
  }
}

const overlayVariants:Variants = {
  overlay : {
    opacity: 1,
    transition:{
      duration: 0.5,
      type:"tween",
      ease:"easeOut"
    }
  },
}

function Home () {

    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies","nowPlaying"], getMovies);
    const movieRoute = useRouteMatch<{id : string}>("/movies/:id");
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const history = useHistory();

    const increaseIndex = () => {
      if(leaving) return;
      setLeaving(true);
      
      if(data) {
        const page = Math.floor(data.results.length / offset) - 1;
        setIndex(prev => prev === page ? 0 : prev+1);
      }
    }
    const toggleLeaving = () => setLeaving(false);
    const onBoxClick = (movieId:number) => () => history.push(`/movies/${movieId}`);
    const onOverlayClick = () => history.goBack();

    return (
        <Wrapper>
          {isLoading ? <Loading>Loading</Loading> : 
            <>
              <Banner 
                onClick={increaseIndex} 
                bgImage={makeImagePath(data?.results[0].backdrop_path || "")}
              >
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
              </Banner>
              
              <Slider>
                <AnimatePresence 
                  initial={false}
                  onExitComplete={toggleLeaving}
                >
                  <Row
                    key={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" 
                    transition={{
                      type:"tween",
                      duration: 1,
                    }}
                  >
                  {data?.results.slice(1)
                    .filter( movie => movie.backdrop_path !== null)
                    .slice(offset* index, offset* index + offset )
                    .map( movie => (
                    <Box
                      layoutId={movie.id+""}
                      onClick={onBoxClick(movie.id)}
                      variants={boxVariants}
                      initial="initial"
                      whileHover="hover"
                      bgimage={makeImagePath(movie.backdrop_path,"w500")}
                      key={movie.id}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box> 
                  ))}
                  </Row>
                </AnimatePresence>
                
              </Slider>
              
              { movieRoute ? 
                  <AnimatePresence>
                    <>
                      <Overlay 
                        onClick={onOverlayClick}
                        variants={overlayVariants}
                        animate="overlay"
                      />
                      <BigBox layoutId={movieRoute?.params.id} />
                    </>
                  </AnimatePresence>
                  : null
                }
            </>
          }
        </Wrapper>
    );

}

export default Home;