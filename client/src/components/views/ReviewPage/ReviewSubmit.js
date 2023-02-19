import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Typography } from "antd";
import TagsPage from "./Sections/Tags";
import RatingPage from "./Sections/Rating";
import ContentPage from "./Sections/Content";
import SimpleMovieInfoPage from "./Sections/SimpleMovieInfo";

const { Text } = Typography;

function Review() {
  const [bestScore, setbestScore] = useState(0);
  const [tags, setTags] = useState([]);
  const data = useLocation().state;
  let history = useHistory();
  let userId = localStorage.getItem("userId");
  let movieId = data.movieInfo._id;

  const onClickSubmit = () => {
    let submitData = {
      writer: userId,
      movieId,
      mainContent: document.getElementById("detail").value,
      comment: document.getElementById("one-line").value,
      ratingTotal: bestScore,
      tagArray: tags,
    };

    Axios.post("/api/reviews", submitData).then((response) => {
      if (response.data.success) {
        alert("리뷰를 등록했습니다!");
        history.push({
          pathname: "/reviews",
        });
      } else {
        alert("[createReview][error]");
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "1rem auto" }}>
      <h2 style={{ fontSize: "1.2rem" }}>Review</h2>
      <hr />
      <div style={{ margin: "1rem auto" }}>
        <h3 style={{ fontSize: "1rem" }}>
          <Text mark>Movie Info</Text>
        </h3>
        <SimpleMovieInfoPage
          movieId={movieId}
          image={data.movieInfo.poster_path}
          alt={data.movieInfo.original_title}
        />
      </div>
      <div style={{ flex: "1" }}>
        <div style={{ margin: "1rem auto", marginTop: "10%" }}>
          <h3 style={{ fontSize: "1rem" }}>
            <Text mark>Star Ratings</Text>
          </h3>
          <RatingPage submitRating setbestScore={setbestScore} />
        </div>
        <div style={{ margin: "1rem auto", marginTop: "10%" }}>
          <h3 style={{ fontSize: "1rem" }}>
            <Text mark>Tags</Text>
          </h3>
          <TagsPage setTags={setTags} tags={tags} />
        </div>
      </div>
      <div style={{ margin: "1rem auto", marginTop: "10%" }}>
        <h3 style={{ fontSize: "1rem" }}>
          <Text mark>Review</Text>
        </h3>
        <ContentPage />
      </div>
      <div style={{ margin: "1rem auto" }}>
        <Button onClick={onClickSubmit}>submit!</Button>
      </div>
    </div>
  );
}

export default Review;
