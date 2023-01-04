import Axios from 'axios'
import React, { useState } from 'react'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const movieId= props.movieId
    const userFrom= props.userFrom

    const [CommentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: userFrom,
            movieId
        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패')
                }
            })    

    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr/>
            {/* Comment Lists */}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} movieId={movieId} userFrom={userFrom} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} movieId={movieId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style= {{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder='댓글을 작성해주세요.'
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment