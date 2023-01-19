import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

function Rating(props) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ARRAY = [0, 1, 2, 3, 4];

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const setStars = () => {
    let clickStates = [...clicked];
    for (let i = 0; i < props.score; i++) {
      clickStates[i] = true;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    if (!props.showRating) sendReview();
  }, [clicked]); //컨디마 컨디업

  useEffect(() => {
    if (!props.submitRating) setStars();
  }, []);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    props.setbestScore(score);
  };

  if (props.submitRating) {
    return (
      <div style={{ margin: "1rem auto" }}>
        <div className="site-card-wrapper">
          <Card title="Best Movie" bordered={false}>
            <Stars>
              {ARRAY.map((el, idx) => {
                return (
                  <FaStar
                    id="rating_submit"
                    key={idx}
                    size="50"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </Card>
        </div>
      </div>
    );
  } else if (props.editRating) {
    return (
      <div style={{ margin: "1rem auto" }}>
        <div className="site-card-wrapper">
          <Card title="Best Movie" bordered={false}>
            <Stars>
              {ARRAY.map((el, idx) => {
                return (
                  <FaStar
                    id="rating_edit"
                    key={idx}
                    size="50"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </Card>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ margin: "1rem auto" }}>
        <div className="site-card-wrapper">
          <Card title="Best Movie" bordered={false}>
            <Stars type="showReview">
              {ARRAY.map((el, idx) => {
                return (
                  <FaStar
                    id="rating"
                    key={idx}
                    size="50"
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </Card>
        </div>
      </div>
    );
  }
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }
  pointer-events: ${(props) => (props.type === "showReview" ? "none" : "auto")}


    :hover svg {
        color:  #fcc419;
    }

    & svg:hover ~ svg {
        color: gray;
    }

  .yellowStar {
    color: #fcc419;
  }ß
`;
