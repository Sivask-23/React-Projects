import { tmdb } from "../ServiceObject";

export const getSingleMovie=async(id)=>{
    const response=await tmdb.get(`movie/${id}`);
    if (response) {
        console.log("resp from API", response.data)
        return response.data;
    }
}