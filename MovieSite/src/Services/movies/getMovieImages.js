import { tmdb } from "../ServiceObject";


export const getMovImages=async(movie_id)=>{
    const response=await tmdb.get(`/movie/${movie_id}/images`);
    if (response) {
        console.log("resp from API",response.data)
        return response.data;
    }
}