import React from "react";
import '../CssComponents/VideoCard.css'


const VideoCard = ({ video }) => {
    const videoUrl =
      video.site === "YouTube"
        ? `https://www.youtube.com/embed/${video.key}`
        : `https://player.vimeo.com/video/${video.key}`;
  
    return (
      <div className="video-card">
        <div className="video-container">
          <iframe
            src={videoUrl}
            title={video.name}
            allowFullScreen
          ></iframe>
        </div>
        <h3 className="video-title">{video.name}</h3>
      </div>
    );
  };
  
  const VideoCardList = ({ videos }) => {
    return (
      <div className="video-card-list">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  };
  
  

  export default VideoCardList;

  