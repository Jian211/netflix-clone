
//https://www.themoviedb.org/
//https://developers.themoviedb.org/3/movies/get-now-playing

export interface IMovies {
    backdrop_path: string,
    id: number,
    overview: string,
    original_title: string,
    poster_path: string,
    title: string,
    release_date: string
}
export interface IGetMoviesResult {
    dates: {
        maximum: string,
        minimum: string,
    },
    page: number,
    results: IMovies[],
    total_pages?:number,
    total_results?: number
}
export interface IGetMovie {
    backdrop_path: string,
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string,
    },
    budget: number,
    genres: [{
        id: number,
        name: string
    }],
    homepage: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path:  string,
    release_date: string,
    title:string,
    video: false,

}
//https://api.themoviedb.org/3/movie/top_rated?api_key=ce9b434971f17988d1abd96515f72d3e&language=ja-JP&page=1
const API_KEY = "ce9b434971f17988d1abd96515f72d3e";
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const urls = {
    topRated : "top_rated",
    popular: "popular",
    upComing: "upcoming"
}

const makeUrl = (text: string) => `${BASE_URL}/${text}?api_key=${API_KEY}&language=ja-JP&page=1`;

export function getMovies() {
    return fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=ja-JP&page=1`)
            .then(res => res.json());
}

// Movie Detail 
export const getMovieDetail = (movieId:number) => {
    return fetch(`${BASE_URL}/${movieId}?api_key=${API_KEY}&language=ja-JP`)
    .then(res => res.json());
}

// Similar api
export const getSimilarMovies = (movieId:number) => {
    return fetch(`${BASE_URL}/${movieId}/similar?api_key=${API_KEY}&language=ja-JP&page=1`).then(res => res.json());
}

//top_rated
export const getTopRatedMovies = () => {
   return fetch(makeUrl(urls.topRated)).then(res => res.json());
}

// popular
export const getPopularMovies = () => {
    return fetch(makeUrl(urls.popular)).then(res => res.json());
}

// upcoming
export const getUpcomingMovies = () => {
    return fetch(makeUrl(urls.upComing)).then(res => res.json());
}

// All movies
export const allMoviesAPI = async () => {
    const result =  {
        "topRated": await getTopRatedMovies(),
        "popular": await getPopularMovies(),
        "upComing": await getUpcomingMovies()
    }
    return result;
}