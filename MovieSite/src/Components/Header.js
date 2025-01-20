import React, { useState } from 'react'
import '../CssComponents/Header.css'
import logo from '../Assets/logo2.png'
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {


    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isTVShowsDropdownVisible, setTVShowsDropdownVisible] = useState(false);

    const navigate=useNavigate();


    const toggleDropdown = (state) => {
      setDropdownVisible(state);
    };

    const toggleTVShowsDropdown = (state) => {
        setTVShowsDropdownVisible(state);
      };
  
      const handleNextPage=(mtype,type)=>{
        console.log("clicked ",type)
        navigate(`${mtype}/${type}`)
        window.scrollTo(0,0);
      }


  return (
    <div className='outerHead'>
        <div className='innerHead'>
            <div className='logodiv'>
                <img src={logo} alt="logo" onClick={()=>{navigate('/')}}/>
            </div>

            <div className='navDiv'>
                <div className='down1' onMouseEnter={() => toggleDropdown(true)} onMouseLeave={() => toggleDropdown(false)}><div>Movies</div>
                    {isDropdownVisible && (
                    <div className="movDrop">
                        <div className="movdropsel">
                        <div onClick={()=>handleNextPage('movies','popular')} className="l1">Popular</div>
                        <div onClick={()=>handleNextPage('movies','now_playing')} className="l1">Now Playing</div>
                        <div onClick={()=>handleNextPage('movies','upcoming')} className="l1">Upcoming</div>
                        <div onClick={()=>handleNextPage('movies','top_rated')} className="l1">Top Rated</div>
                        </div>
                    </div>
                 )}
                </div>
                <div className='down2' onMouseEnter={() => toggleTVShowsDropdown(true)} onMouseLeave={() => toggleTVShowsDropdown(false)}>
                    <div>TV Shows</div>
                    {isTVShowsDropdownVisible && (
                    <div className="movDrop2">
                        <div className="movdropsel">
                        <div onClick={()=>handleNextPage('tvshows','popular')}  className="l1">Popular</div>
                        <div onClick={()=>handleNextPage('tvshows','airing_today')} className="l1">Airing Today</div>
                        <div onClick={()=>handleNextPage('tvshows','on_the_air')} className="l1">On TV</div>
                        <div onClick={()=>handleNextPage('tvshows','top_rated')} className="l1">Top Rated</div>
                        </div>
                    </div>
                 )}
                </div>
                <Link  className='down3'><div>More</div></Link>
            </div>

            <div className='otherDiv'>
                <div></div>
                <div className='hdIcon'> <ManageSearchSharpIcon style={{ fontSize: 40, color: 'aqua' }}/></div>
            </div>
        </div>
    </div>
  )
}

export default Header