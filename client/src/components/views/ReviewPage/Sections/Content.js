import React, { useEffect, useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;

function Content(props) {
  const [Comment, setComment] = useState("");
  const [Main, setMain] = useState("");

  useEffect(() => {
    setComment(props.comment);
    setMain(props.mainContent);
  }, []);

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onMainChange = (e) => {
    setMain(e.target.value);
  };

  if (props.editReview) {
    return (
      <div>
        <h4>one-line</h4>
        <TextArea
          id="one-line"
          onChange={onCommentChange}
          value={Comment}
          rows={4}
          maxLength={50}
        />
        <br />
        <br />
        <h4>detail</h4>
        <TextArea id="detail" onChange={onMainChange} value={Main} rows={4} />
      </div>
    );
  } else {
    return (
      <div>
        <h4>one-line</h4>
        <TextArea
          id="one-line"
          rows={4}
          placeholder="한줄평을 적어주세요."
          maxLength={50}
        />
        <br />
        <br />
        <h4>detail</h4>
        <TextArea id="detail" rows={4} placeholder="상세 리뷰를 적어주세요." />
      </div>
    );
  }
}

export default Content;
