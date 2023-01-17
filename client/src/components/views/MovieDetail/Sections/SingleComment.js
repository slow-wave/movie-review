import React from "react";
import { Comment, Avatar, Button } from "antd";
import Axios from "axios";
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {
  const variables = {
    writer: props.userFrom,
    movieId: props.movieId,
    responseTo: props.comment._id,
  };

  const onDelete = () => {
    Axios.post("/api/comment/deleteComment", variables).then((response) => {
      if (response.data.success) {
      } else {
        alert("comment 삭제 실패");
      }
    });
  };

  return (
    <div>
      <Comment
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      >
        <LikeDislikes userId={props.userFrom} commentId={props.comment._id} />

        {props.userFrom === props.comment.writer._id && (
          <Button onClick={onDelete}>삭제</Button>
        )}
      </Comment>
    </div>
  );
}

export default SingleComment;
