import { tmdb } from "../ServiceObject";

export const getCreditsSeries=async(series_id)=>{
    const response= await tmdb.get(`tv/${series_id}/credits`);
    if (response) {
        return response.data;
    }
}