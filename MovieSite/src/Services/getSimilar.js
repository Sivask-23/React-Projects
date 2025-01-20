import { tmdb } from "./ServiceObject";

export const getSimilarRec=async(type,movid)=>{
    const response=await tmdb.get(`${type}/${movid}/similar`);
    if (response) {
        console.log(`respo from similar api of ${type}`,response.data);
        return response.data;
    }
}