import { tmdb } from "../ServiceObject";

export const getVideosMov=async(movie_id)=>{
    const response=await tmdb.get(`movie/${movie_id}/videos`);
    if (response) {
        console.log("respo from Video Api",response.data);
        return response.data;
    }
}
