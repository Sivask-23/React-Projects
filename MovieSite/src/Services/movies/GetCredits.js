import { tmdb } from "../ServiceObject";

export const getCredits=async(movie_id)=>{
    const response=await tmdb.get(`movie/${movie_id}/credits`);
    if (response) {
        console.log("from credit API",response.data)
        return response.data;
    }
}