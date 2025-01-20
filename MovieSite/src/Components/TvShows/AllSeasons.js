import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../CssComponents/series/AllSeasons.css'
import { getSingleSer } from '../../Services/series/SingleSeriesData';

const AllSeasons = () => {


  const {tvid}=useParams();
  const [seasons,setSeasons]=useState([]);
  const navigate=useNavigate();


  useEffect(()=>{
    const fetchAllseasons=async()=>{
      try {

        const seasResponse=await getSingleSer(tvid);
        if (seasResponse) {
          setSeasons(seasResponse);
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllseasons();
  },[tvid])


  const gotoEpisode=(season_number)=>{
      navigate(`/tvshow/${tvid}/season/${season_number}`)
  }



  return (
    <div className='outer-allseason'>
      {(seasons) && (<>
        <div className='inner-outerseason-ban'>
        <div className='inner-season-postData'>
          <img src={`https://image.tmdb.org/t/p/w500${seasons.poster_path}`} alt="poster"/>
          <div className='postData-title'>{seasons?.name} <div className='postData-title1'>({seasons?.first_air_date?.substring(0,4)})</div></div>
        </div>
      </div>


      <div className='allseasoninnerdata'>
        {seasons.seasons && (
          seasons.seasons.map((ser,idx)=>{return(
            <div className='serall-cur-season' key={idx} onClick={()=>{gotoEpisode(ser.season_number)}}>
            <div className='serdivall'>
              <div className='seasoncardposterall'><img src={`https://image.tmdb.org/t/p/w500${ser.poster_path || seasons.poster_path}`} alt="poster"/></div>
              <div className='seasonconall'>
                <div className='seas1'>{ser.name}</div>
                <div className='seas2'>{ser.air_date?.substring(0,4)} • {ser.episode_count} Episodes</div>
                <div className='seas3'>{ser.overview}</div>
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

export default AllSeasons