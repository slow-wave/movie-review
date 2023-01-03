import Axios from 'axios'
import React, { useState } from 'react'
import  { useSelector } from 'react-redux'

function Comment(props) {
    const movieId= props.movieId
    const userFrom= props.userFrom
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        const variables = {
            content: commentValue,
            writer: userFrom,
            movieId
        }
        
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
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

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style= {{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder='댓글을 작성해주세요.'
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick>Submit</button>
            </form>
        </div>
    )
}

export default Comment