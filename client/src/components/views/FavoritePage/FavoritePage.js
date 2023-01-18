import "./favorite.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../Config";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import {
  CloseCircleTwoTone,
  PlusSquareTwoTone,
  RightSquareTwoTone,
} from "@ant-design/icons";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  let userId = localStorage.getItem("userId");
  let userNickname = localStorage.getItem("nickname");

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: userId,
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("영화 정보 가져오기 실패");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("favorite 삭제 실패");
        }
      }
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <a href={`/movie/${favorite.movieId}`} style={{ color: "#566270" }}>
            <td>{favorite.movieTitle}</td>
          </a>
        </Popover>
        <td>
          {/* 작성된 리뷰가 없다면 '새로 작성' 활성화 */}
          {favorite.detailed.length === 0 && (
            <Link
              to={{
                pathname: `/review/submit/${favorite.movieId}`,
                state: { movieInfo: favorite.detailedMovie[0] },
              }}
            >
              <PlusSquareTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "20px" }}
              />
            </Link>
          )}
          {/* 작성된 리뷰가 있다면 '리뷰 확인' 활성화 */}
          {favorite.detailed.length !== 0 && (
            <Link
              to={{
                pathname: `/review/${userNickname}/${favorite.detailed[0]._id}`,
                state: {
                  image: `${IMAGE_BASE_URL}w500${favorite.detailedMovie[0].poster_path}`,
                  movieName: favorite.detailedMovie[0].original_title,
                },
              }}
            >
              <RightSquareTwoTone
                twoToneColor="#7200da"
                style={{ fontSize: "20px" }}
              />
            </Link>
          )}
        </td>
        <td>
          <CloseCircleTwoTone
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
            twoToneColor="#eb2f96"
            style={{ fontSize: "20px" }}
          />
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> Favorite Movies </h2>
      <hr />
      <div style={{ margin: "3rem auto" }}>
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Review</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritePage;
