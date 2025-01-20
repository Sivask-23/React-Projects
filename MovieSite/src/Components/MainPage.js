import React, { useEffect, useState } from 'react'
import '../CssComponents/MainPage.css'
import Trending from './Trending'
import { getAllTrend } from '../Services/getAllTrending';
import { ClipLoader } from 'react-spinners';
const MainPage = () => {




  const [trending, setTrending]=useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true); // Loading state for trending
  const type='all';
  const time_window='day'

  useEffect(()=>{
    const fetchAllTrend=async()=>{
      try {

        const trendResponse=await getAllTrend(type,time_window);
        if (trendResponse && trendResponse.results) {
          setTrending(trendResponse.results);
          console.log("trend data from UI",trendResponse.results)
          setLoadingTrending(false);
        }
        
      } catch (error) {
        console.log(error, "FRom UI")
        setLoadingTrending(true)
      }
    }

    fetchAllTrend();
  },[])

  return (
    <div className='outer-MainPage'>

        <div className='welSec'>
          <div className='wel-title'>Welcome.</div>
          <div className='wel-slogan'>to <div className='sloganclr'>The Classy Corner of Cinemas</div></div>
        </div>


        <div className='mainpage-sec1'>
          {loadingTrending?(
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <ClipLoader color="#fff" size={50} />
              </div>
          ):(
            trending.length>0 && (<Trending movies={trending}/>)
          )}
        </div>

    </div>
  )
}

export default MainPage