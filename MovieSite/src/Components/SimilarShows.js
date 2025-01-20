import React, { useEffect, useState } from "react";
import "../CssComponents/SimilarShows.css";
import { getSimilarRec } from "../Services/getSimilar";
import { useNavigate } from "react-router-dom";

const SimilarShows = ({ movieId, type}) => {
  const [shows, setShows] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {

    const fetchSimilarShows = async () => {
     const simresponse=await getSimilarRec(type,movieId);
     if (simresponse && simresponse.results) {
        setShows(simresponse.results.filter((ele)=>{return ele.poster_path!==null}));
     }
    };

    fetchSimilarShows();
  }, [movieId, type]);

  const handleNavigation = (id) => {
    window.scrollTo(0,0);
    navigate(`/movie/${id}`);
  };

  return (
    <div className="similar-shows">
      {shows && shows.length>0 ? (<div className="shows-list">
        {shows.map((show) => (
          <div key={show.id} className="show-card" onClick={()=>{handleNavigation(show.id)}}>
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.title || show.name}
            />
            <p>{show.title || show.name}</p>
          </div>
        ))}
      </div>):(<div className="sim-not">not found</div>)}
    </div>
  );
};

export default SimilarShows;
