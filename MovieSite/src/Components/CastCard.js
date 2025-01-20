import React from "react";
import '../CssComponents/CastCard.css'

const CastCard = ({ originalName, characterName, imageUrl }) => {
    const placeholderImage = "https://via.placeholder.com/200x300?text=No+Image"; 
  return (
    <div className="cast-card">
      <img src={imageUrl || placeholderImage} alt={originalName} className="cast-image" />
      <div className="cast-info">
        <h4 className="cast-name">{originalName}</h4>
        <p className="cast-character">{characterName}</p>
      </div>
    </div>
  );
};

const CastList = ({ cast }) => {
  return (
    <div className="cast-list">
      {cast.map((actor, index) => {
        const imageURL = actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : null;
        return(
        <CastCard
          key={index}
          originalName={actor.original_name}
          characterName={actor.character}
          imageUrl={imageURL}
        />
        )})}
    </div>
  );
};

export default CastList;
