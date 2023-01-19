import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import ReviewPage from "./Sections/Reviews";
import { Row } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [Reviews, setReviews] = useState([]);
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
    fetchReviews();
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const fetchReviews = () => {
    Axios.post("/api/review/getReview", {
      writer: userId,
    }).then((response) => {
      if (response.data.success) {
        console.log("data", response.data);
        if (response.data.reviews.length > 4) {
          randomReviews(response.data.reviews);
        }
        setReviews(response.data.reviews);
      } else {
        alert("리뷰 정보 가져오기 실패");
      }
    });
  };
  const randomReviews = (reviewList) => {
    let newnum = [];
    while (reviewList.length > 4) {
      let movenum = reviewList.splice(
        Math.floor(Math.random() * reviewList.length),
        1
      )[0];
      newnum.push(movenum);
    }
  };

  return (
    <div>
      {/* Main Image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Reviews */}
        {Reviews && <ReviewPage data={Reviews} />}
        <h2 style={{ fontSize: "1.2rem" }}>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {Movies[0] &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
        {/* Load more contents button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem auto",
          }}
        >
          <PlusCircleTwoTone
            onClick={loadMoreItems}
            twoToneColor="#52c41a"
            style={{ fontSize: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
