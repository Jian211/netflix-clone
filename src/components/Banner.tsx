import styled from 'styled-components';

const Wrapper = styled.div<{bgImage: string}>`
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

interface BannerProps {
    title: string,
    overview: string,
    backdropPath: string
}

const Banner = ( { title, overview, backdropPath }: BannerProps) => {

  return (
    <Wrapper bgImage={backdropPath} >
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </Wrapper>
  )
}

export default Banner