import React, { useEffect, useState } from 'react'
import '../../CssComponents/movies/SingleMovie.css'
import { getSingleMovie } from '../../Services/movies/SingleMoviedata';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getMovImages } from '../../Services/movies/getMovieImages';
import { getCertfificate } from '../../Services/movies/GetCertification';
import Ratings from '../Ratings';
import { getCredits } from '../../Services/movies/GetCredits';
import CastList from '../CastCard';
import { getVideosMov } from '../../Services/movies/GetMovVideos';
import VideoCardList from '../VideoCard';
import SimilarShows from '../SimilarShows';
import WatchProviders from '../WatchProviders';


const SingleMovie = () => {




    const [singleMovie,setSingleMovie]=useState({});
    const [logos, setLogos]=useState(null);
    const [certf,setCertf]=useState([]);
    const [credits, setCredits]=useState([])
    const [crew, setCrew]=useState([]);
    const [videos, setVideos]=useState([])
    const [loading,setLoading]=useState(true);
    const {movid}=useParams();

    useEffect(()=>{
        setLogos(null);
        const fetchSingleMovie=async()=>{
            try {
                const movieResponse=await getSingleMovie(movid);
                const imageResponse=await getMovImages(movid)
                const certResponse=await getCertfificate(movid);
                const creditResponse=await getCredits(movid);
                const videoResponse=await getVideosMov(movid);
                if (movieResponse) {
                    setSingleMovie(movieResponse)
                    setLoading(false)
                }
                if (imageResponse && imageResponse.logos.length>0) {
                    const englishLogos=imageResponse.logos.filter((logo)=>  logo.iso_639_1 === "en")
                    if (englishLogos.length>0) {
                        setLogos(englishLogos[0].file_path);
                        console.log(englishLogos)
                    }

                }

                if (certResponse) {
                    setCertf(certResponse.results.filter((country) =>(country.iso_3166_1==='IN' || country.iso_3166_1==='US')));
                }

                if (creditResponse) {
                    console.log(creditResponse.cast)
                    setCredits(creditResponse.cast)
                    setCrew(creditResponse.crew)
                }

                if (videoResponse && videoResponse.results) {
                    setVideos(videoResponse.results);
                }




            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleMovie();
    },[movid])


    if (certf) {
        console.log(certf);
    }


    function convertToHours(minutes) {
        const hours = Math.floor(minutes / 60); // Get the number of full hours
        const remainingMinutes = minutes % 60; // Get the remaining minutes
        return `${hours}h ${remainingMinutes}min`;
      }




  return (
    <div className='outer-single'>
        <div className='inner-single'>

            {loading ? (
                <div className='loadPhase'><h3>Loading....</h3></div>
            ):(
                <div className='mov-main-det'>
                        <div className='mov-poster'>
                            {singleMovie.backdrop_path ? (<><LazyLoadImage src={`https://image.tmdb.org/t/p/original${singleMovie.backdrop_path}`}alt={ singleMovie.title || "Movie Poster"} key={movid}/>                        </>
                        ) : (
                            <div className="mov-placeholder">
                                {singleMovie.poster_path?(<LazyLoadImage src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`}alt={`${singleMovie?.title}`}/>):(
                                    <div>No Image Available</div>
                                )}
                            </div>
                        )}
                            <div className="mov-overlay"></div>
                            <div className="mov-poster-data">
                                <div className='logoPart'>
                                {logos?(<LazyLoadImage src={`https://image.tmdb.org/t/p/original${logos}?t=${Date.now()}`}alt={`${singleMovie?.title || "Movie"} Logo`}/>)
                                :(
                                    <div className='logoPartAlt'>{singleMovie.title}</div>
                                )}
                                </div>
                                <div className='mov-poster-det1'>
                                    <div className='det1year'>{singleMovie.release_date.substring(0,4)}</div>
                                    <div className="det1certf">
                                    {certf.length > 0
                                        ? certf.find((ele) =>
                                            ele.release_dates.some(
                                            (release) => release.certification && release.certification.trim() !== ""
                                            )
                                        )?.release_dates.find(
                                            (release) => release.certification && release.certification.trim() !== ""
                                        )?.certification || "Not Available"
                                        : "Not Available"}
                                    </div>
                            
                                    <div className='det1gen'>{singleMovie.genres[0].name}</div>
                                    <div className='det1runtime'>{convertToHours(singleMovie.runtime)}</div>
                                    
                                </div>
                                <div className='mov-poster-det2'>
                                    <div className='imdbrate'><b>IMDb</b> rating </div>
                                    <div className='ratingStar'><Ratings rating={singleMovie.vote_average}/></div>
                                </div>
                            </div>
                        </div>

                        <div className='mov-det2'>
                            {singleMovie.overview.length>0 &&(
                                <div className='mov-story'>
                                    <div className='mov-story-title'>Storyline</div>
                                    <div className='mov-story-over'>{singleMovie.overview}</div>
                                    <div className='mov-story-gen'><b>Genres : </b>{singleMovie.genres.map((gen,idx)=>{
                                        return <div className='genitem' key={idx}>{gen.name} {idx===singleMovie.genres.length-1?'':','}</div>
                                    })}</div>
                                    
                                    {crew.length > 0 && (
                                        <div className="mov-story-credits">
                                            <div className="crdtit">More details</div>

                                            {/* Display Directors */}
                                            <div className="credItems">
                                            <b>Director(s) :</b>{" "}
                                            {crew.filter((ele) => ele.known_for_department === "Directing").length > 0
                                                    ? crew
                                                        .filter((ele) => ele.known_for_department === "Directing").splice(0,3)
                                                        .map((pro, idx, arr) => (
                                                        <span key={idx}>
                                                            {pro.name}
                                                            {idx < arr.length - 1 ? ", " : ""}
                                                        </span>
                                                        ))
                                                    : "Not Available"}
                                            </div>

                                            {/* Display Writing Department */}
                                            <div className="credItems">
                                                <b>Producer(s) :</b>{" "}
                                                {crew.filter((ele) => ele.known_for_department === "Production").length > 0
                                                    ? crew
                                                        .filter((ele) => ele.known_for_department === "Production").splice(0,3)
                                                        .map((pro, idx, arr) => (
                                                        <span key={idx}>
                                                            {pro.name}
                                                            {idx < arr.length - 1 ? ", " : ""}
                                                        </span>
                                                        ))
                                                    : "Not Available"}
                                            </div>
                                        </div>
                                    )}
                                    
                                </div>
                            )}
                        </div>

                        <div className='mov-det3'>
                            <div className='cast-title'>Cast</div>
                            <div className='castDiv'><CastList cast={credits}/></div>
                        </div>

                        <div className='mov-det4'>
                            <div className='media-title'>Media</div>
                            <div className='mediaDiv'>{videos.length>0 ? (<VideoCardList videos={videos}/>):(<><p>Media not available</p></>)}</div>
                        </div>

                        <div className='mov-det4'>
                            <div className='media-title'>You Might Also Like</div>
                            <div className='mediaDiv'><SimilarShows movieId={movid} type={'movie'}/></div>
                        </div>

                        <div className='mov-det5'>
                            <div className='provider-title'>Global Watch Providers</div>
                            <div className='providerDiv'><WatchProviders mediaType={'movie'} id={movid}/></div>
                        </div>





                </div>
                
            )}



        </div>
    </div>
  )
}

export default SingleMovie