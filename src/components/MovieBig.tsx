import { motion, Variants } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

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

const Box = styled(motion.div)<{bgimage: string}>`
  background-color: white;
  height: 200px;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  background-position: center center;
  font-size: 40px;
  width: 14.6vw;


  &:first-child{
    transform-origin: center left;
  }

  &:last-child{
    transform-origin: center right;
  }
`
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

interface MovieBigProps {
    movieId: number,
    backdropPath: string,
    title: string,
}

const MovieBig = ({movieId, backdropPath, title}:MovieBigProps) => {
  const history = useHistory();

  const onBoxClick = (movieId:number) => () => history.push(`/movies/${movieId}`);

    return (
        <Box
            layoutId={movieId+""}
            onClick={onBoxClick(movieId)}
            variants={boxVariants}
            initial="initial"
            whileHover="hover"
            bgimage={makeImagePath(backdropPath,"w500")}
            key={movieId}
        >
            <Info variants={infoVariants}>
                <h4>{title}</h4>
            </Info>
        </Box> 
  )
}

export default MovieBig