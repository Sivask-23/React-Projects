import React, { useEffect, useRef ,useState} from 'react'
import '../CssComponents/Trending.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
const Trending = ({movies}) => {





    const track=useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const navigate=useNavigate();







      // Check scroll position and update button visibility
    const updateButtonVisibility = () => {
        const ptrack = track.current;
        if (ptrack) {




            console.log('scrollLeft:', ptrack.scrollLeft);
            console.log('clientWidth:', ptrack.clientWidth);
            console.log('scrollWidth:', ptrack.scrollWidth);


            const atStart = ptrack.scrollLeft === 0; // Check if at the start
            const atEnd = ptrack.scrollLeft + ptrack.clientWidth >= ptrack.scrollWidth-1; // Check if at the end
            setCanScrollLeft(!atStart); // Hide left button if at the start
            setCanScrollRight(!atEnd); // Hide right button if at the end
        }
    };


    const scrollLeft = () => {
        if (track.current) {
            track.current.scrollBy({
                left: -600, // Scroll amount (same as the width of one poster)
                behavior: 'smooth', // Smooth scrolling effect
              });
        }
      };
    
      // Function to scroll right
      const scrollRight = () => {
        if (track.current) {
            track.current.scrollBy({
                left: 600, // Scroll amount (same as the width of one poster)
                behavior: 'smooth', // Smooth scrolling effect
              });
        }
      };




      useEffect(() => {
        const posttrack = track.current;
        if (posttrack) {
          // Add event listener for scroll event
          posttrack.addEventListener('scroll', updateButtonVisibility);
          // Initial button visibility check
          updateButtonVisibility();
        }
    
        // Cleanup function to remove event listener
        return () => {
          // const posttrack = track.current;
          if (posttrack) {
            posttrack.removeEventListener('scroll', updateButtonVisibility);
          }
        };
      }, []);

      const handleNavigation = (id) => {
        navigate(`/movie/${id}`);
      };

      const handleTvNavigation = (id) => {
        navigate(`/tvshow/${id}`);
      };


  return (
    <div className='outer-Trend'>
        <div className='trend-title'>Trending</div>
        <div className='inner-Trend'>
            <div className='lftbtn'><button onClick={scrollLeft} style={{ visibility: canScrollLeft ? '' : 'hidden' }}><KeyboardDoubleArrowLeftIcon/></button></div>

            <div className='trending-track' ref={track}>
                {movies.map((moviedata,idx)=>{return(
                <div className='trend-card' key={idx} onClick={()=>{moviedata.title?handleNavigation(moviedata.id):handleTvNavigation(moviedata.id)}}>
                    <div className='imgCard'><img src={`https://image.tmdb.org/t/p/w500${moviedata.poster_path}`} alt={moviedata.title} /></div>
                    <div className='Trend-card-title'>{moviedata.title?moviedata.title:moviedata.name}</div>
                </div>
                )})}
            </div>

            <div className='rgtbtn'><button onClick={scrollRight} style={{ visibility: canScrollRight ? '' : 'hidden' }}><KeyboardDoubleArrowRightIcon/></button></div>
        </div>
    </div>
  )
}

export default Trending