import { tmdb } from "../ServiceObject";

export const getAllMovieList=async(typeofmovie,page=1)=>{
    const response=await tmdb.get(`movie/${typeofmovie}`,{
        params:{
            page:page
        }
    });
    if (response) {
        console.log("resp from api ",response.data)
        return response.data
    }
}