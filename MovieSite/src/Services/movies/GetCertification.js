import { tmdb } from "../ServiceObject";

export const getCertfificate=async(movie_id)=>{
    const response=await tmdb.get(`movie/${movie_id}/release_dates`);
    if (response) {
        return response.data;
    }
}