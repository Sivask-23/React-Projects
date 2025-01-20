import { tmdb } from "../ServiceObject";

export const getAlltvList=async(type,page=1)=>{
    const response=await tmdb.get(`tv/${type}`,{
        params:{
            page:page
        }
    }) ;
    if (response) {
        console.log(response.data)
        return response.data;
    }
}