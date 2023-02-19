import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";
import CastInfo from "./Sections/CastInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  let userFrom = localStorage.getItem("userId");

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [Comments, setComments] = useState([]);

  const movieVariable = {
    movieId: movieId,
  };

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response);
      });

    Axios.post("/api/comment/getComments", movieVariable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글 정보 가져오기 실패");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* Body */}
      <div
        style={{
          width: "85%",
          margin: "1rem auto",
        }}
      >
        {/* Favorite button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={userFrom} />
        </div>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        {/* Actors Grid */}
        <CastInfo casts={Casts} />
      </div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Comment */}
        <Comment
          CommentLists={Comments}
          movieId={movieId}
          userFrom={userFrom}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
