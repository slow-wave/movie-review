import Axios from "axios";
import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../Config";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function ReviewShow() {
  const [Reviews, setReviews] = useState([]);
  let userId = localStorage.getItem("userId");
  let userNickname = localStorage.getItem("nickname");

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = () => {
    Axios.post("/api/review/getReview", {
      writer: userId,
    }).then((response) => {
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        alert("리뷰 정보 가져오기 실패");
      }
    });
  };

  return (
    <div style={{ width: "90%", margin: "1rem auto" }}>
      <h2 style={{ fontSize: "1.2rem" }}> Reviews of '{userNickname}'</h2>
      <hr />
      {/* Review Grid Cards */}
      <Row gutter={[16, 16]}>
        {Reviews &&
          Reviews.map((review, index) => (
            <React.Fragment key={index}>
              <GridCards
                reviewPage
                nickname={userNickname}
                reviewId={review._id}
                posterPath={review.detailed[0].poster_path}
                image={
                  review.detailed[0].poster_path
                    ? `${IMAGE_BASE_URL}w500${review.detailed[0].poster_path}`
                    : null
                }
                movieId={review.movieId}
                movieName={review.detailed[0].original_title}
              />
            </React.Fragment>
          ))}
      </Row>
    </div>
  );
}

export default ReviewShow;
