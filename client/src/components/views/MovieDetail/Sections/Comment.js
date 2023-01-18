import Axios from "axios";
import React, { useState } from "react";
import SingleComment from "./SingleComment";
import { Input, Button } from "antd";
import { CommentOutlined, EditTwoTone } from "@ant-design/icons";

function Comment(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;

  const [CommentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: userFrom,
      movieId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("댓글 저장 실패");
      }
    });
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <br />
      <p>
        <CommentOutlined />
        Replies
      </p>
      <hr />
      {/* Comment Lists */}
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  movieId={movieId}
                  userFrom={userFrom}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex", marginTop: "2%" }} onSubmit={onSubmit}>
        <Input
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글을 작성해주세요."
        />
        <br />
      </form>
      <Button onClick={onSubmit} shape="circle" style={{ float: "right" }}>
        <EditTwoTone />
      </Button>
    </div>
  );
}

export default Comment;
