import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { Button, Tag, Card, Space, Typography } from "antd";
import RatingPage from "./Sections/Rating";
import SimpleMovieInfoPage from "./Sections/SimpleMovieInfo";

const { Text } = Typography;

function ReviewDetail(props) {
  const [Review, setReview] = useState([]);
  const [bestScore, setbestScore] = useState(0);
  const [Tags, setTags] = useState([]);

  const location = useLocation();
  let history = useHistory();

  const image = location.state.image;
  const movieName = location.state.movieName;
  let reviewId = props.match.params.reviewId;
  let userName = localStorage.getItem("nickname");

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = () => {
    Axios.get(`/api/:userId/reviews/${reviewId}`).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setReview(...response.data.result);
        setTags(response.data.result[0].tagArray);
      } else {
        console.log("[ReviewDetail][fetchReview][error]");
      }
    });
  };
  //동작X
  const onClickDelete = () => {
    Axios.delete(`/api/reviews/${reviewId}`).then((response) => {
      if (response.data.success) {
        alert("삭제 완료");
        history.push({ pathname: `/reviews` });
      } else {
        console.log("[ReviewDetail][onClickDelete][error]");
      }
    });
  };

  const onClickEdit = () => {
    history.push({ pathname: `/${userName}/reviews/update` });
  };

  return (
    <div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2 style={{ fontSize: "1.2rem" }}>Review</h2>
        <hr />
        <div style={{ margin: "1rem auto" }}>
          <h3 style={{ fontSize: "1rem" }}>Movie Info</h3>
          <SimpleMovieInfoPage
            movieId={Review.movieId}
            image={image}
            alt={movieName}
          />
        </div>
        <div style={{ margin: "1rem auto", marginTop: "10%" }}>
          <h3 style={{ fontSize: "1rem" }}>
            <Text mark>Star Ratings</Text>
          </h3>
          {Review.ratingTotal ? (
            <RatingPage
              showRating
              setbestScore={setbestScore}
              score={Review.ratingTotal}
            />
          ) : (
            <></>
          )}
          <div style={{ margin: "1rem auto", marginTop: "10%" }}>
            <h3 style={{ fontSize: "1rem" }}>
              <Text mark>Tags</Text>
            </h3>
            {Tags && Tags.map((tag) => <Tag>{tag}</Tag>)}
          </div>
        </div>
        <div style={{ margin: "1rem auto", marginTop: "10%" }}>
          <h3 style={{ fontSize: "1rem" }}>
            <Text mark>Review</Text>
          </h3>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card title="one-line">
              <p>{Review.comment}</p>
            </Card>
            <Card title="detail">
              <p>{Review.mainContent}</p>
            </Card>
          </Space>
        </div>
      </div>
      <div style={{ width: "85%", margin: "1rem auto", display: "flex" }}>
        <div style={{ flex: "1" }}>
          <Link
            to={{
              pathname: `/review/edit/${userName}/${reviewId}`,
              state: {
                review: Review,
                tags: Tags,
                image: image,
                alt: movieName,
                movieId: Review.movieId,
              },
            }}
          >
            <Button onClick={onClickEdit}>Edit</Button>
          </Link>
        </div>
        <div style={{ flex: "1", textAlign: "right" }}>
          <Button danger onClick={onClickDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
