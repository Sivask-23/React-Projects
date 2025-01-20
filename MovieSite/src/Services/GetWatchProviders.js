import { tmdb } from "./ServiceObject";

export const getWatchProviders=async(type,movie_id)=>{
    const response=await tmdb.get(`${type}/${movie_id}/watch/providers`);
    if (response) {
        console.log("resp from provider API",response.data)
        return response.data;
    }
}