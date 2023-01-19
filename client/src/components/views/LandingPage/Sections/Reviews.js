import React from "react";
import { Carousel } from "antd";

function Reviews(props) {
  let userNickname = localStorage.getItem("nickname");
  const reviews = props.data;
  const contentStyle = {
    height: "150px",
    color: "#FFFFF3",
    lineHeight: "60px",
    textAlign: "center",
    background: "#8EC0E4",
    fontSize: "0.8rem",
    fontWeight: "bold",
  };

  return (
    <div>
      {reviews.length !== 0 && (
        <div>
          <h2 style={{ fontSize: "1.2rem" }}>Reviews of '{userNickname}'</h2>
          <Carousel autoplay>
            {reviews.map((el) => (
              <div>
                <h3 style={contentStyle}>
                  "{el.comment}"
                  <br />
                  {el.detailed[0].original_title}
                </h3>
              </div>
            ))}
          </Carousel>
        </div>
      )}
      {reviews.length === 0 && (
        <div style={{ margin: "1rem auto" }}>
          <h2 style={{ fontSize: "1.2rem" }}>No Review.</h2>
          <p style={{ fontSize: "1.2rem", color: "#6AAFE6" }}>
            What's your favorite Movie?
            <br />
            Please add movie to favorites and write a review!
          </p>
        </div>
      )}
    </div>
  );
}

export default Reviews;
