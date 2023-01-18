import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Tooltip, Button } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.movieId) {
    variable = { movieId: props.movieId, userId: props.userFrom };
  } else {
    variable = { commentId: props.commentId, userId: props.userFrom };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(response.data.likes.length);
        //이미 좋아요를 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("likes 정보 가져오기 실패");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(response.data.dislikes.length);
        //이미 싫어요를 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("dislikes 정보 가져오기 실패");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Like를 올리지 못했습니다.");
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Like를 내리지 못했습니다.");
        }
      });
    }
  };

  const onDislike = () => {
    if (DislikeAction !== null) {
      Axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Dislike를 지우지 못했습니다.");
        }
      });
    } else {
      Axios.post("/api/like/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("Like를 내리지 못했습니다.");
        }
      });
    }
  };

  return (
    <div style={{ float: "left" }}>
      <Button
        key="comment-basic-like"
        type="text"
        style={{ color: "#77AF9C", width: "40%" }}
      >
        <Tooltip title="Like">
          {LikeAction === "liked" ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Likes} </span>
      </Button>
      <Button key="comment-basic-dislike" type="text" style={{ width: "40%" }}>
        <Tooltip title="Dislike">
          {DislikeAction === "disliked" ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Dislikes} </span>
      </Button>
      &nbsp;&nbsp;
    </div>
  );
}

export default LikeDislikes;
