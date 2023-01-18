import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import RatingPage from "./Sections/Rating";
import SimpleMovieInfoPage from "./Sections/SimpleMovieInfo";
import { Button, Tag, Card, Space, Typography } from "antd";

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
  let userId = localStorage.getItem("userId");
  let userNickname = localStorage.getItem("nickname");

  useEffect(() => {
    fetchReview();
    fetchTag();
  }, []);

  const fetchReview = () => {
    Axios.post("/api/review/getOneReview", { _id: reviewId }).then(
      (response) => {
        if (response.data.success) {
          setReview(response.data.review[0]);
        } else {
          alert("리뷰 정보 가져오기 실패");
        }
      }
    );
  };

  const fetchTag = () => {
    Axios.post("/api/review/getTag", { _id: reviewId }).then((response) => {
      if (response.data.success) {
        setTags(response.data.tags[0].tagArray);
      } else {
        alert("리뷰 정보 가져오기 실패");
      }
    });
  };

  const onClickDelete = () => {
    const variables = { reviewId };

    Axios.post("/api/review/removeFromReview", variables).then((response) => {
      if (response.data.success) {
        alert("삭제가 완료되었습니다.");
        //이동
        history.push({
          pathname: `/review`,
        });
      } else {
        alert("favorite 삭제 실패");
      }
    });
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
              pathname: `/review/edit/${userNickname}/${reviewId}`,
              state: {
                review: Review,
                tags: Tags,
                image: image,
                alt: movieName,
                movieId: Review.movieId,
              },
            }}
          >
            <Button>Edit</Button>
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
