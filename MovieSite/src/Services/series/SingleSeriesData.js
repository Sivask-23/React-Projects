import { tmdb } from "../ServiceObject";

export const getSingleSer=async(series_id)=>{
    const response= await tmdb.get(`tv/${series_id}`);
    if (response) {
        console.log("single data from API",response.data);
        return response.data;
    }

}