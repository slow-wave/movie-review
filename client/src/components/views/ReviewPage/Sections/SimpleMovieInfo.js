import React from "react";
import { IMAGE_BASE_URL } from "../../../../Config";

function SimpleMovieInfo(props) {
  return (
    <div>
      <a href={`/movie/${props.movieId}`}>
        <img
          style={{ width: "30%" }}
          src={`${IMAGE_BASE_URL}w500${props.image}`}
          alt={props.movieName}
        />
      </a>
    </div>
  );
}

export default SimpleMovieInfo;
