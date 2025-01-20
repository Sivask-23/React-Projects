import React, { useEffect, useState } from 'react'
import '../../CssComponents/series/AllSeries.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getAlltvList } from '../../Services/series/getAllSeriesList';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Ratings from '../Ratings'



const AllSeries = () => {





  const [allSeries,setAllSeries]=useState([])
  const params=useParams();
  const [pageNum, setPageNum]=useState(1);
  const [titlename,setTitle]=useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loadingMov, setLoadingMov] = useState(true);
  const navigate=useNavigate()

  let typeoftv=''
  if (params) {
    console.log(params.tvtype)
    typeoftv=params.tvtype;
  }
  const setSideTitle=(Type)=>{
    // window.scroll(0,0)
    switch (Type) {
      case 'popular':
        setTitle('Popular TV Shows')
        break;
      
      case 'airing_today':
        setTitle('TV Shows Airing Today')
        break;

      case 'on_the_air':
        setTitle('Currently Airing TV Shows')
        break;
        
      case 'top_rated':
        setTitle('Top Rated TV Shows')
        break;

      default:
        break;
    }
  }


  useEffect(()=>{
    setAllSeries([]);
    setPageNum(1);
    setHasMore(true); // Reset hasMore in case the type changes
    setSideTitle(typeoftv);
  },[typeoftv])


  useEffect(()=>{
    const fetchSeries=async()=>{
      try {

        const tvResponse= await getAlltvList(typeoftv,pageNum);
        if (tvResponse && tvResponse.results) {
          console.log(tvResponse.results)
          if (pageNum===1) {
            setAllSeries(tvResponse.results);
          }else{
            setAllSeries((prev)=>[...prev,...tvResponse.results])
          }
          setHasMore(tvResponse.results.length > 0);
        }
        
      } catch (error) {
        console.log(error)

      }finally{
        setLoadingMov(false)
      }
    }

    fetchSeries();

  },[typeoftv,pageNum])



    // Function to convert date
    const formatDate = (dateString) => {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const [year, month, day] = dateString.split("-");
      const monthName = months[parseInt(month, 10) - 1];

      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    };

    const loadMoreSeries=()=>{
      if (hasMore) {
        setPageNum((prev)=>prev+1)
      }
    }


    const handleTvNavigation = (id) => {
      navigate(`/tvshow/${id}`);
    };




  return (
    <div className='outer-allseries'>
        <div className='inner-allmovies'>
          <div className='side1'>
            <div className='side1-title'>{titlename}</div>
            <div className='side1Filter'>filter</div>
          </div>
          <div className='side21'>
          <InfiniteScroll
                dataLength={allSeries.length}
                next={loadMoreSeries}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                >
            <div className='side2'>
              {loadingMov?(
                  <div style={{ textAlign: 'center', padding: '90px' }}>
                    <ClipLoader color="black" size={50} />
                  </div>
              ):(
                allSeries.length>0 && (
                allSeries.map((mov,idx)=>{
                  return(
                    <div className='mov-card' key={idx} onClick={()=>{handleTvNavigation(mov.id)}}>
                      <div className='imgMovCard'><LazyLoadImage src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt={mov.title} effect='blur' /></div>
                      <div className='Mov-card-title'>
                        <div>{mov.name}</div>
                        <div className='movDate'>{formatDate(mov.first_air_date)}</div>
                      </div>
                      <div className='cardrating' ><Ratings rating={mov.vote_average}/></div>
                    </div>
                  )
                })
                )
              )}
            </div>
          </InfiniteScroll>
          </div>
        </div>
    </div>
  )
}

export default AllSeries