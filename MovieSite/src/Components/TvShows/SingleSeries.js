import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../CssComponents/series/SingleSeries.css';
import { useParams } from 'react-router-dom';
import { getSingleSer } from '../../Services/series/SingleSeriesData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {getCertificate } from '../../Services/series/GetCertification';
import Ratings from '../Ratings';
import { getCreditsSeries } from '../../Services/series/GetCredits';
import CastList from '../CastCard';
import { getSeriesVideos } from '../../Services/series/getVideos';
import VideoCardList from '../VideoCard';
import SimilarShows from '../SimilarShows';
import WatchProviders from '../WatchProviders';

const SingleSeries = () => {
  const { tvid } = useParams();
  const [series, setSeries] = useState(null); // Initial state should be null to represent no data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certf,setCertf]=useState([]);
  const [credits, setCredits]=useState([])
  const [videos, setVideos]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    const fetchSingleSeries = async () => {
      try {
        const seriesResponse = await getSingleSer(tvid);
        const certResponse=await getCertificate(tvid);
        const castResponse=await getCreditsSeries(tvid)
        const videResp=await getSeriesVideos(tvid);
        if (seriesResponse) {
          setSeries(seriesResponse);
        } else {
          setError('Series not found');
        }

        if (certResponse) {
          setCertf(certResponse.results.filter((country) =>(country.iso_3166_1==='IN' || country.iso_3166_1==='US')));
        }

        if (castResponse) {
          setCredits(castResponse.cast);
        }

        if (videResp) {
          setVideos(videResp.results);
        }

      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchSingleSeries();
  }, [tvid]);

  if (loading) {
    return (
      <div className="loadPhase">
        <h3>Loading....</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>{error}</h3>
      </div>
    );
  }
  if (certf) {
    console.log(certf)
  }

  const stillpath=series.last_episode_to_air?.still_path ? series.last_episode_to_air?.still_path : series.poster_path;

  const gotoEpisode=(season_number)=>{
    navigate(`/tvshow/${tvid}/season/${season_number}`)
}

  return (
    <div className="outer-ser">
      <div className="inner-ser">
        {series && (
          <div className="ser-main-det">
            <div className="ser-poster">
              {series.backdrop_path ? (
                
                  <div className="poster-image">
                    <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                    alt={series.name || "Series Poster"}
                    effect="blur"/>
                  </div>

              ) : (
                <div className="ser-placeholder">
                  {series.poster_path ? (
                    <LazyLoadImage
                      src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                      alt={series.name || "Series Poster"}
                      effect="blur"
                      className="poster-image"
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </div>
              )}
              <div className="ser-overlay"></div>

              <div className="ser-poster-data">

                <div className='ser-post'>
                <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                    alt={series.name || "Series Poster"}
                    effect="blur"/>
                </div>

                <div className='serdet'>
                    <div className='stitle'>{series.name} <span>({series.first_air_date.substring(0,4)})</span></div>
                    <div className='ser-poster-det1'>
                                  <div className="det1certf">
                                    {certf.length > 0
                                      ? (
                                          certf.find((country) => country.iso_3166_1 === 'IN')?.rating?.trim() ||
                                          certf.find((country) => country.iso_3166_1 === 'US')?.rating?.trim() ||
                                          "Not Available"
                                      )
                                      : "Not Available"}
                                  </div>
                                                              
                                  <div className='ser1gen'>{series.genres.map((genre) => genre.name).join(', ')}</div>            
                    </div>
                    <div className='ser-poster-det2'>
                                    
                                    <div className='ratingStar'><Ratings rating={series.vote_average}/></div>
                                    <div className='imdbrate'><b>User score</b></div>
                     </div>
                    <div className='serover'>
                      <div><b>Overview</b></div>
                      <div>{series.overview}</div>
                    </div>
                </div>
              </div>

            </div>


            <div className='mov-det3'>
                <div className='cast-title'>Series cast</div>
                <div className='castDiv'><CastList cast={credits}/></div>
            </div>

            {series.seasons?.length>0 && 
            
            <div className='ser-cur-season'>
                <div className='seas-title'>Current Season</div>
                <div className='serdiv' onClick={()=>{gotoEpisode(series.last_episode_to_air?.season_number)}}>
                  <div className='seasoncardposter'><img src={`https://image.tmdb.org/t/p/w500${stillpath}`} alt="poster"/></div>
                  <div className='seasoncon'>
                    <div className='seas1'>Season {series.last_episode_to_air?.season_number}</div>
                    <div className='seas2'>{series.last_episode_to_air?.air_date?.substring(0,4)} • {series.last_episode_to_air?.episode_number} Episodes</div>
                    <div className='seas3'>{series.last_episode_to_air?.overview}</div>
                    <div className='seas4'>Season {series.last_episode_to_air?.episode_type?.charAt(0).toUpperCase()+series.last_episode_to_air?.episode_type?.slice(1)}</div>
                  </div>
                                      
                </div>
                <Link to={`/tvshow/${tvid}/allseasons`} className='allseasons'>View All Seasons</Link>
            </div>
            }


            <div className='mov-det4'>
                <div className='media-title'>Media</div>
                <div className='mediaDiv'>{videos.length>0 ? (<VideoCardList videos={videos}/>):(<><p>Media not available</p></>)}</div>
            </div>


            <div className='mov-det4'>
                <div className='media-title'>You Might Also Like</div>
                <div className='mediaDiv'><SimilarShows movieId={tvid} type={'tv'}/></div>
            </div>


            <div className='mov-det5'>
                <div className='provider-title'>Global Watch Providers</div>
                <div className='providerDiv'><WatchProviders mediaType={'tv'} id={tvid}/></div>
            </div>




          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSeries;
