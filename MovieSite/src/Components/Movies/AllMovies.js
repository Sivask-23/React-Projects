import React, { useEffect, useState } from 'react'
import '../../CssComponents/movies/AllMovies.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllMovieList } from '../../Services/movies/getMovieLists'
import { ClipLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Ratings from '../Ratings'

const AllMovies = () => {

  const params=useParams();
  const [movies, setMovies]=useState([]);
  const [page, setPage]=useState(1);
  const [titlename,setTitle]=useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loadingMov, setLoadingMov] = useState(true);
  const navigate=useNavigate();

  let getType=''
  if (params) {
    console.log(params.Movietype)
    getType=params.Movietype;
  }



  const setSideTitle=(Type)=>{
    // window.scroll(0,0)
    switch (Type) {
      case 'popular':
        setTitle('Popular Movies')
        break;
      
      case 'now_playing':
        setTitle('Now Playing Movies')
        break;

      case 'upcoming':
        setTitle('Up Coming Movies')
        break;
        
      case 'top_rated':
        setTitle('Top Rated Movies')
        break;

      default:
        break;
    }
  }


  useEffect(() => {
    // Reset the movies list and page number whenever the movie type changes
    setMovies([]);
    setPage(1);
    setHasMore(true); // Reset hasMore in case the type changes
    setSideTitle(getType);
  }, [getType]);


  useEffect(() => {
    const fetchAllType = async () => {
      try {
        const typeResponse = await getAllMovieList(getType, page);
  
        if (typeResponse.results) {
          
          if (page === 1) {
            setMovies(typeResponse.results);  // Reset movies on first page load
          } else {
            setMovies((previousMovies) => [...previousMovies, ...typeResponse.results]);
          }
          setHasMore(page<typeResponse.total_pages);
        }
      } catch (error) {
        console.log("Error fetching movies:", error);
        setLoadingMov(false);
      } finally {
        setLoadingMov(false);
      }
    };

    if (getType && page) {
      fetchAllType();
    }
  }, [getType, page]);
  
  




  const handleNavigation = (id) => {
    navigate(`/movie/${id}`);
  };


  const loadMoreMovies = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };



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

  return (
    <div className='outer-allmovies'>
        <div className='inner-allmovies'>
          <div className='side1'>
            <div className='side1-title'>{titlename}</div>
            <div className='side1Filter'>filter</div>
          </div>
          <div className='side21'>
          <InfiniteScroll
                dataLength={movies.length}
                next={loadMoreMovies}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                >
            <div className='side2'>
              {loadingMov?(
                  <div style={{ textAlign: 'center', padding: '90px' }}>
                    <ClipLoader color="black" size={50} />
                  </div>
              ):(
                movies.length>0 && (
                movies.map((mov,idx)=>{
                  return(
                    <div className='mov-card' key={idx} onClick={()=>{handleNavigation(mov.id)}}>
                      <div className='imgMovCard'><LazyLoadImage src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt={mov.title} effect='blur' /></div>
                      <div className='Mov-card-title'>
                        <div>{mov.title}</div>
                        <div className='movDate'>{formatDate(mov.release_date)}</div>
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

export default AllMovies