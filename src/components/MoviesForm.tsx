import { AnimatePresence, motion, Variants } from 'framer-motion';
import {useState} from 'react'
import styled from 'styled-components';
import { IMovies } from '../api';
import MovieFormBox from './MovieFormBox';


const IndexIncreaseBox = styled.div`
  text-align: center;
  background-color: rgba(0,0,0,0.5);
  border-radius: 8px;
  margin: 0 5px;
  display: flex;
  align-items: center;

  img{
    width: 60px;
    filter: invert();
    opacity: 0.6;
  }
`;

const offset = 6;

const Slider = styled.div`
    display: flex;
    margin: 0 10px;
    height: 20vh;
`;


const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
`;
const rowVariants:Variants = {

  hidden:direction => ({
    x :  direction ? window.outerWidth  :  window.outerWidth  ,
  
  }),
  visible:{
    x: 0,
    transition: {
      type:"tween",
      ease:"circIn",
      duration:0.6
    }
  },
  exit:{
    // x :  -window.outerWidth + -450,
    opacity: 0,
    transition:{
      duration: 0.5,
      ease:"easeIn",
    }
  }
  
}

export interface IMoviesForm {
    movies :  IMovies[];
}

const MoviesForm = ({movies}:IMoviesForm) => {
    const [direction, setDirection] = useState(true);
    const [index, setIndex] = useState(0);
     const [leaving, setLeaving] = useState(false);

  
    const toggleLeaving = () => setLeaving(false);
    const indexHandler = (direction:string) => () => {
      if(leaving) return;
      
      if(movies) {
        const page = Math.floor(movies.length / offset) - 1;
        setDirection(direction === "left" ? false : true);
        
        setIndex(prev => {
          return direction === "left" 
          ? prev === 0 ? page : prev - 1
          : prev === page ? 0 : prev + 1
        });
      };
      setLeaving(prev => !prev);
    }
    
  return (
    <Slider >
        <AnimatePresence  onExitComplete={toggleLeaving}  initial={false}> 
        <IndexIncreaseBox onClick={indexHandler("left")} key="IndexIncreaseBox" >
            <img alt="left" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" />
        </IndexIncreaseBox>
        <Row
          key={index}
          variants={rowVariants}  
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={direction}
        >
          <MovieFormBox 
            movies={movies} 
            offset={offset}
            index={index}
          />
        </Row>
        <IndexIncreaseBox onClick={indexHandler("right")}>
            <img style={{transform:"rotate(180deg)"}} alt="right" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" />
        </IndexIncreaseBox>
        </AnimatePresence>
    </Slider>
  )
}

export default MoviesForm