import { tmdb } from "./ServiceObject";

export const getAllTrend=async(type_data,time_window)=>{
    const response=await tmdb.get(`trending/${type_data}/${time_window}`);
    if (response) {
        console.log("response from api",response.data)
        return response.data;
    }
}