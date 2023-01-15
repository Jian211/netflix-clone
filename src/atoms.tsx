import { atom, selector } from "recoil";
import { allMoviesAPI, getPopularMovies, getSimilarMovies, getUpcomingMovies, IGetMoviesResult,} from "./api";


interface IAllMoviesState {
    [key: string]: IGetMoviesResult
}

export const allMoviesState = atom<IAllMoviesState>({
    key: "allMovies",
    default: allMoviesAPI(),
})


// get: () => getTopRatedMovies,
export const topRatedMovies = selector({
    key: "topRated",
    get: () => {},
})

export const similarMovies = selector({
    key: "similar",
    get: () => getSimilarMovies,
})

export const popularMovies = selector({
    key:"popular",
    get: async () => {
        const popular = getPopularMovies;
        console.log(popular);
        return await popular;
    },
    set: ({set}, newValue) => {
        console.log(newValue)
        console.log(set)
    }

})

export const upcomingMovies = selector({
    key:"upcoming",
    get: () => getUpcomingMovies,
})