import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Descriptions } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    moviePost,
    movieTitle,
    movieRunTime,
  };

  let datas = {
    _id: movieId,
    adult: props.movieInfo.adult,
    backdrop_path: moviePost,
    belongs_to_collection: props.movieInfo.belongs_to_collection,
    budget: props.movieInfo.budget,
    genres: props.movieInfo.genres,
    original_language: movieTitle,
    original_title: props.movieInfo.original_title,
    overview: props.movieInfo.overview,
    popularity: props.movieInfo.popularity,
    poster_path: props.movieInfo.poster_path,
    production_companies: props.movieInfo.production_companies,
    production_countries: props.movieInfo.production_countries,
    release_date: props.movieInfo.release_date,
    revenue: props.movieInfo.revenue,
    runtime: movieRunTime,
    spoken_languages: props.movieInfo.spoken_languages,
    status: props.movieInfo.status,
    title: props.movieInfo.title,
    video: props.movieInfo.video,
    vote_average: props.movieInfo.vote_average,
    vote_count: props.movieInfo.vote_count,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert("숫자 정보 가져오기 실패");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보 가져오기 실패");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 삭제 실패");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 추가 실패");
        }
      });
      Axios.post("/api/movie/addToMovie", datas).then((response) => {
        if (response.data.success) {
        } else {
          alert("movie 정보 추가 실패");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite} type="dashed" block>
        {Favorited ? (
          <HeartFilled style={{ color: "#eb2f96", fontSize: "20px" }} />
        ) : (
          <HeartOutlined style={{ color: "#eb2f96", fontSize: "20px" }} />
        )}{" "}
        {FavoriteNumber}{" "}
      </Button>
    </div>
  );
}

export default Favorite;
