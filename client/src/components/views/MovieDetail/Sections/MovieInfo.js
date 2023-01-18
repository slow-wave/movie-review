import { Descriptions, Tag, Badge } from "antd";
import React from "react";

function MovieInfo(props) {
  let { movie } = props;

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem" }}>Movie Info</h2>
      <hr />
      <div style={{ marginTop: "5%" }}>
        <Descriptions title="summary" bordered>
          <Descriptions.Item label="Title">
            {movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="release_date">
            {movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Score">
            <Badge
              style={{ backgroundColor: "#379392" }}
              count={movie.vote_average}
            ></Badge>
          </Descriptions.Item>
          <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
          <Descriptions.Item label="runtime">
            {movie.runtime >= 60 && parseInt(movie.runtime / 60) + "H "}
            {movie.runtime % 60}M
          </Descriptions.Item>
          <Descriptions.Item label="genres">
            {movie.genres &&
              movie.genres.map((el) => <Tag color="geekblue">{el.name}</Tag>)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

export default MovieInfo;
