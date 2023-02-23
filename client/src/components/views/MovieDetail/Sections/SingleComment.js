import React from "react";
import { Comment, Avatar, Button, Dropdown, Space } from "antd";
import Axios from "axios";
import LikeDislikes from "./LikeDislikes";
import { MenuOutlined, DeleteOutlined } from "@ant-design/icons";

function SingleComment(props) {
  let commentId = props.comment._id;
  const onDelete = () => {
    //댓글 삭제
    Axios.delete(`/api/comments/${commentId}`).then((response) => {
      if (response.data.success) {
      } else {
        alert("comment 삭제 실패");
      }
    });
  };

  const items = [
    {
      label: (
        <a onClick={onDelete}>
          <DeleteOutlined />
        </a>
      ),
      key: "0",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <Comment
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt="image" />}
            content={<p>{props.comment.content}</p>}
          ></Comment>
          <LikeDislikes userId={props.userFrom} commentId={props.comment._id} />
        </div>
        <div style={{ flex: "1", textAlign: "right" }}>
          {props.userFrom === props.comment.writer && (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
