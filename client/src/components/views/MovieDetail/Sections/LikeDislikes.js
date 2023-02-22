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
  let userId = localStorage.userId;
  let commentId = props.commentId;
  let movieId = props.movieId;
  let variable;

  if (movieId) {
    variable = { movieId, userId };
  } else {
    variable = { commentId, userId };
  }

  useEffect(() => {
    //좋아요 수 조회
    Axios.get(`/api/${commentId}/likes`).then((response) => {
      if (response.data.success) {
        setLikes(response.data.result.length);
        //로그인 유저가 좋아요를 눌렀는지 확인
        response.data.result.map((like) => {
          if (like.userId === userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("likes 정보 가져오기 실패");
      }
    });

    //싫어요 수 조회
    Axios.get(`/api/${commentId}/dislikes`).then((response) => {
      if (response.data.success) {
        setDislikes(response.data.result.length);
        //로그인 유저가 싫어요를 눌렀는지 확인
        response.data.result.map((dislike) => {
          if (dislike.userId === userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("dislikes 정보 가져오기 실패");
      }
    });
  }, []);

  const onLike = () => {
    //좋아요가 등록되지 않았다면
    if (LikeAction === null) {
      //좋아요 등록
      Axios.post(`/api/${userId}/${commentId}/likes`).then((response) => {
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
      //좋아요 삭제
      Axios.delete(`/api/${userId}/${commentId}/likes`).then((response) => {
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
    //싫어요가 등록되지 않았다면
    if (DislikeAction !== null) {
      //싫어요 삭제
      Axios.delete(`/api/${userId}/${commentId}/dislikes`).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Dislike를 지우지 못했습니다.");
        }
      });
    } else {
      //싫어요 등록
      Axios.post(`/api/${userId}/${commentId}/dislikes`).then((response) => {
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
