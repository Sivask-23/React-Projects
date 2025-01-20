import React, { useState } from 'react'
import '../../CssComponents/series/AllEpisodes.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { getEpisodes } from '../../Services/series/getAllEpisodes';



const AllEpisodes = () => {

    const {tvid,snum}=useParams();
    const [episodes,setEpisodes]=useState([])

    useEffect(()=>{

        const fetchAllEpisodes=async()=>{
            try {

                const episodeResponse=await getEpisodes(tvid,snum);
                if (episodeResponse) {
                    setEpisodes(episodeResponse)
                }
                
            } catch (error) {
                console.log("error from episode UI",error)
            }
        }
        fetchAllEpisodes()

    },[tvid,snum])




    function convertToHours(minutes) {
        const hours = Math.floor(minutes / 60); // Get the number of full hours
        const remainingMinutes = minutes % 60; // Get the remaining minutes
        if (hours===0) {
            return `${remainingMinutes}min`;
        }else{
            return `${hours}h ${remainingMinutes}min`;
        }
        
      }







  return (
        <div className='outer-allseason'>
        {(episodes) && (<>
        <div className='inner-outerseason-ban'>
        <div className='inner-season-postData'>
            <img src={`https://image.tmdb.org/t/p/w500${episodes.poster_path}`} alt="poster"/>
            <div className='postData-title'>{episodes?.name} <div className='postData-title1'>({episodes?.air_date?.substring(0,4)})</div></div>
        </div>
        </div>


        <div className='allseasoninnerdataE'>
        <div className='epnum'>Episodes : {episodes.episodes?.length}</div>
        {episodes.episodes && (
            episodes.episodes.map((epi,idx)=>{return(
            <div className='serall-cur-seasonE' key={idx}>
            <div className='serdivallE'>
                <div className='seasoncardposterallE'><img src={`https://image.tmdb.org/t/p/original${epi.still_path || episodes.poster_path}`} alt="poster"/></div>
                <div className='seasonconall'>
                <div className='seas1'>{epi.name}</div>
                <div className='seas2'>{epi.air_date?.substring(0,4)} • {convertToHours(epi.runtime)}</div>
                <div className='seas3'>{epi.overview}</div>
                </div>                       
            </div>
            </div>
            )})
        )}
        </div>

        </>)}
    </div>
  )
}

export default AllEpisodes