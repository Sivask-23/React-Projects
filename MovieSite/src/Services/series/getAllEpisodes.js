import { tmdb } from "../ServiceObject";

export const getEpisodes=async(series_id,season_number)=>{
    const response=await tmdb.get(`tv/${series_id}/season/${season_number}`)
    if (response) {
        console.log("resp from episode API ",response.data)
        return response.data;
    }
}