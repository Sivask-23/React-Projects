import { tmdb } from "../ServiceObject";

export const getSeriesVideos=async(series_id)=>{
    const response=await tmdb.get(`tv/${series_id}/videos`);
    if (response) {
        return response.data;
    }
}