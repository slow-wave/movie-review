import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function Favorite(props) {
  const movieId = props.movieId;
  const userId = props.userFrom;
  const data = props.movieInfo;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let movieInfo = {
    _id: movieId,
    adult: data.adult,
    backdrop_path: data.backdrop_path,
    belongs_to_collection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres,
    original_language: data.title,
    original_title: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    poster_path: data.poster_path,
    production_companies: data.production_companies,
    production_countries: data.production_countries,
    release_date: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    spoken_languages: data.spoken_languages,
    status: data.status,
    title: data.title,
    video: data.video,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
  };

  useEffect(() => {
    Axios.get(`/api/${movieId}/likes`).then((response) => {
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert("숫자 정보 가져오기 실패");
      }
    });

    Axios.get(`/api/${userId}/${movieId}/favorites`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorited(response.data.favorited);
      } else {
        alert("정보 가져오기 실패");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.delete(`/api/${userId}/${movieId}/favorites`).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 삭제 실패");
        }
      });
    } else {
      Axios.post(`/api/${userId}/${movieId}/favorites`).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 추가 실패");
        }
      });
      Axios.post("/api/movie/addToMovie", movieInfo).then((response) => {
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
        )}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
