import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, Link, useHistory } from "react-router-dom";

import TagsPage from "./Sections/Tags";
import RatingPage from "./Sections/Rating";
import ContentPage from "./Sections/Content";
import SimpleMovieInfoPage from "./Sections/SimpleMovieInfo";
import { Button, Typography } from "antd";

const { Text } = Typography;

function ReviewEdit() {
  const [bestScore, setbestScore] = useState(0);
  const [tags, setTags] = useState([]);
  const data = useLocation().state;
  let history = useHistory();
  let userNickname = localStorage.getItem("nickname");
  let reviewId = data.review._id;

  const onClickEdit = () => {
    let variables = {
      _id: reviewId,
      mainContent: document.getElementById("detail").value,
      comment: document.getElementById("one-line").value,
      ratingTotal: bestScore,
      tagArray: tags,
    };

    Axios.patch(`/api/reviews/${reviewId}`, variables).then((response) => {
      if (response.data.success) {
        alert("리뷰를 수정했습니다!");
        history.push({ pathname: "/reviews" });
      } else {
        alert("수정 실패");
      }
    });
  };

  return (
    <div style={{ width: "90%", margin: "1rem auto" }}>
      <h2 style={{ fontSize: "1.2rem" }}>Review</h2>
      <hr />
      <div style={{ margin: "1rem auto" }}>
        <h3 style={{ fontSize: "1rem" }}>
          <Text mark>Movie Info</Text>
        </h3>
        <SimpleMovieInfoPage
          movieId={data.movieId}
          image={data.image}
          alt={data.alt}
        />
      </div>
      <div style={{ margin: "1rem auto", marginTop: "10%" }}>
        <h3 style={{ fontSize: "1rem" }}>
          <Text mark>Star Ratings</Text>
        </h3>
        {data.review.ratingTotal ? (
          <RatingPage
            editRating
            setbestScore={setbestScore}
            score={data.review.ratingTotal}
          />
        ) : (
          <></>
        )}
        <div style={{ margin: "1rem auto", marginTop: "10%" }}>
          <h3 style={{ fontSize: "1rem" }}>
            <Text mark>Tags</Text>
          </h3>
          <TagsPage setTags={setTags} tags={tags} data={data.tags} />
        </div>
      </div>
      <div style={{ margin: "1rem auto", marginTop: "10%" }}>
        <h3 style={{ fontSize: "1rem" }}>
          <Text mark>Review</Text>
        </h3>
        <ContentPage
          editReview
          comment={data.review.comment}
          mainContent={data.review.mainContent}
        />
      </div>
      <div style={{ margin: "1rem auto" }}>
        <Link
          to={{
            pathname: `/review/${userNickname}/${data.review._id}`,
            state: { image: data.image, movieName: data.alt },
          }}
        >
          <Button onClick={onClickEdit}>등록</Button>
        </Link>
      </div>
    </div>
  );
}

export default ReviewEdit;
