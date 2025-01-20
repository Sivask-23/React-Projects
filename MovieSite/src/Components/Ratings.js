import React from 'react'

const Ratings = ({ rating }) => {


      // Ensure the rating is between 0 and 10
  const clampedRating = Math.max(0, Math.min(rating.toFixed(1), 10));

  // Calculate the percentage for the circular progress
  const percentage = (clampedRating / 10) * 100;
  return (
<div
      style={{
        position: "relative",
        width: "65px",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="100" height="100" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="#4caf50"
          strokeWidth="4"
          strokeDasharray={`${percentage} ${100 - percentage}`}
          strokeDashoffset="25"
          strokeLinecap="round"
          transform="rotate(0 18 18)"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          fontSize: "17px",
          fontWeight: "bold",
          color: "white",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
}

export default Ratings