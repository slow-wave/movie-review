import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios'

const{ TextArea } = Input;

function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const movieId= props.movieId
    const userFrom= props.userFrom

    const variables = {
        content: CommentValue,
        writer: userFrom,
        movieId,
        responseTo: props.comment._id
    }
    
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패')
                }
            })          
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to </span>    
    ]
    
    const onDelete = () => {
        Axios.post('/api/comment/deleteComment', variables)
        .then(response => {
            if(response.data.success) {
            } else {
                alert('comment 삭제 실패')
            }
        })

    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            >
                {( userFrom === props.comment.writer._id &&
                    <Button onClick={onDelete}>삭제</Button>
                )}
            </Comment>
            

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    )
}

export default SingleComment