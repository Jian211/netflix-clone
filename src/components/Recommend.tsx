import { motion, Variants } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getSimilarMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const RecommendMovieBox = styled.div`
    width: 100%;
    height: fit-content ;
    background-color: black;
    padding:  40px ;
    
    h2{
        font-size: 20px;
        font-weight: bold;
        color:white;
        margin: 10px 0 20px;
    }
`;

const RecommendGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30%, auto));
    gap: 20px;
    
`;

const RecommendForm = styled(motion.div)`
    border-radius: 20px;
    height: 100%;
    background-color: #3a3838;
    position: relative;
    img:first-child {
        position: absolute;
        top: 3%;
        left: 3%;
        width: 26px;
    }

    h2 {
        position: absolute;
        margin: 10px;
        font-size: 1.4vw;
        right: 10px;
        top: 24%;
        text-shadow: 2px 2px 4px rgba(0,0,0,1);
    }
`;

const Poster = styled.img`
    width: 100%;
    border-radius: 20px 20px 0 0;
`;
const RecommendContent = styled.div`
    padding: 12px;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{
            width: 40px;
            filter: invert(100%);
        }
    }

`;
const ContentHeader = styled.div`
    display: flex;
    flex-direction: column;

    h3:first-child {
        color: yellowgreen;
        width: 100%;
        margin-left: 6px;
        font-weight:bold;
    }
    div{
        display: flex;
        font-weight: bold;

        div{
            height: 34px;
            padding: 4px;
            margin: 4px 6px 4px 4px;
            border-radius: 4px;
            background-color: green;
        }

    }
`;

const Contents = styled.h4`
    margin: 10px 0;
    width: 100%;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    font-size: 1vw;
`;

const recommendVariants:Variants = {
    init: {
        scale: 1,
    },
    click : {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease:"easeInOut"
        }
    },
}

interface IRecommend {
    movieId: number
}

export const Recommend = ({movieId}:IRecommend) => {

  const {data} = useQuery<IGetMoviesResult>(["recommend"], async () => await getSimilarMovies(movieId));
  const history = useHistory();
  const goDetail = (movieId:number) => () => history.push(`/movies/${movieId}`)
  
  return (
    <RecommendMovieBox>
        <h2>似たようなジャンルの映画</h2>
        <RecommendGrid>
            {data?.results
                .filter(movie => movie.overview)
                .map(movie => (
                    <RecommendForm 
                        key={movie.id}
                        onClick={goDetail(movie.id)}
                        variants={recommendVariants}
                        initial="init"
                        // animate="click"
                        whileHover="click"                        
                    >
                        <img src="https://w7.pngwing.com/pngs/280/326/png-transparent-logo-netflix-logos-and-brands-icon-thumbnail.png" alt=""/>
                        <h2>{movie.title}</h2>
                        <Poster src={makeImagePath(movie.backdrop_path, "w500")}  alt=""/> 
                        <RecommendContent>
                            <div>
                                <ContentHeader>
                                    <h3>New</h3>
                                    <div>
                                        <div>ALL</div>
                                        <h3>2022</h3>
                                    </div>
                                </ContentHeader>
                                <img src="https://static.thenounproject.com/png/261370-200.png" alt="" />
                            </div>
                            <Contents>{movie.overview}</Contents>
                        </RecommendContent>
                    </RecommendForm>
            ))}
        </RecommendGrid>
    </RecommendMovieBox>
  )
}
