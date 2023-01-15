import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { getMovieDetail, IGetMovie } from '../api';
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { Recommend } from './Recommend';
import { makeImagePath } from '../utils';

const BigBox = styled(motion.div)`
  width: 50%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  top: 100px;
  left:0;
  right:0;
  margin: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieImgForm =styled.div`
    position: relative;
`;

const Xbutton = styled.img`
    z-index: 1;
    position: absolute;
    width:4vw;
    top:1%;
    right: 1%;
    margin: 20px;
    filter: invert(100%);
`;

const MovieImg = styled.div<{movieImg: string}>`
    background-image:url(${props => props.movieImg}) ;
    background-size: cover;
    width: 100%;
    height: 70vh;
   
`;

const PlusImg = styled.div<{plusImg:string}>`
    background-size:cover;
    background-image: url(${props => props.plusImg});
    background-color: white;
    width: 40px;
    height: 40px;
`
const HeartImg = styled.div<{heartImg: string}>`
    background-image: url(${props => props.heartImg});
    background-size: cover;
    width: 40px;
    height: 40px;
    margin: 0 10px;
`;

const PlayImg = styled.div<{playImg: string}>`
    background-image: url(${props => props.playImg});
    background-size: cover;
    width: 50px;
    height: 50px;
`;

const PlayForm = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 10vw;
    border-radius: 10px;
    background-color: white;
    color:black;
    

    span{
        width: 40px;
    }
`;

const MovieControllerForm = styled.div`
    display: flex;
    align-items: center;
    height: 5vh;
    width: fit-content;
    background-color: white;
    border-radius: 6px;
`;

const MovieSmallInfo = styled.div`
    position: absolute;
    width: 100%;
    padding: 50px;
    bottom: 40px;
`;

const MovieTitle = styled.div`

    h2{
        font-size: 40px;
        padding: 20px 0;
        font-weight: bold;
        text-shadow: 2px 2px 10px  black;
    }
`;

const MovieContentForm = styled.div`
    width: 100%;
    background-color: black;
    padding: 50px;
`;

const ImgGradation = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background:linear-gradient(to top, #000000, rgba(0,0,0,0.1) 10%);
`;

const OriginalTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color:whitesmoke;
`;

const OverView = styled.h3`
    font-size: 1vw;
    width: 80%;
    padding: 20px 0;
`;

const GenreBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;

    ul {
        display: flex;
        font-weight: bold;

        li{
            padding: 6px 10px;
            margin: 0 6px;
            border-radius: 10px;
            background-color: whitesmoke;
            color: #383838;
        }
    }
`;

const Genre = styled.h3`
    font-size: 20px;
    font-weight: bold;
    padding:  10px 10px 10px 0 ;
    width: fit-content;
`;

interface MovieDetailProps {
    movieId: number,
//     overview: string,
//     original_title: string,
//     movieImg : string,
//     title: string
}

const { playImg,plusImg,heartImg,exitButton } = {
    playImg: "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-play-button-icon-image_1128222.jpg",
    plusImg: "https://www.clipartmax.com/png/small/79-791760_plus-addition-sign-circle-vector-1-icon-png.png",
    heartImg: "https://spng.pngfind.com/pngs/s/52-526635_heart-icon-black-heart-icon-png-transparent-png.png",
    exitButton:"https://cdn-icons-png.flaticon.com/512/7693/7693271.png",
}

const bigBoxVariants:Variants = {
    init: {
        opacity:0,
        transition:{
            delay: 0.5
        }
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeIn",
            type:"tween"
        }
    },
    exit: {
        opacity: 0,
        transition:{
            duration:0.5,
        }
    }
}

const MovieDetail = ({ movieId }:MovieDetailProps) => {
    const { data } = useQuery<IGetMovie>(["movie"], async() => await getMovieDetail(movieId));
    const history = useHistory();
    const goBack = () => history.goBack();

    return (
        <>
        {data && 
            <BigBox layoutId={movieId+""} variants={bigBoxVariants} initial="init" animate="animate" exit="exit">
                <Xbutton onClick={goBack} alt="" src={exitButton} />
                <MovieImgForm>
                    <div>
                        <ImgGradation /> 
                        <MovieImg  movieImg={makeImagePath(data.backdrop_path,"w500")} />
                    </div>
                    
                    <MovieSmallInfo>
                        <MovieTitle>
                            <h2>{data.title}</h2>
                        </MovieTitle>
                        <MovieControllerForm>
                            <PlayForm>
                                <PlayImg playImg={playImg} />
                                <span>再生</span>
                            </PlayForm>
                            <PlusImg plusImg={plusImg} />
                            <HeartImg heartImg={heartImg} />
                        </MovieControllerForm>
                    </MovieSmallInfo>
                </MovieImgForm>
                <MovieContentForm>
                    <OriginalTitle>{data.original_title}</OriginalTitle>
                    <OverView>{data.overview}</OverView>
                    <GenreBox>
                        <Genre>ジャンル</Genre>
                        <ul>
                            {data?.genres.map( genre => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>                  
                    </GenreBox>  
                </MovieContentForm>
                
                <Recommend movieId={movieId} />
            </BigBox>
            }
        </>
    )
}

export default MovieDetail