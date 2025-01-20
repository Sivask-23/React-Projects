import { tmdb } from "../ServiceObject";

export const getCertificate=async(series_id)=>{
    const response=await tmdb.get(`tv/${series_id}/content_ratings`);
    if (response) {
        console.log("cert from API",response.data)
        return response.data
    }
}