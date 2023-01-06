import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'
import Axios from 'axios';

const { TextArea } = Input;

function Review(props) {
    const userId = props.match.params.userId;
    const movieId = props.match.params.movieId;
    const [MainContent, setMainContent] = useState("");
    const [Comment, setComment] = useState("");

    const onClickSubmit = (event) => {
        let variables = {
            writer : userId,
            movieId,
            mainContent: document.getElementById('one-line').value,
            comment: document.getElementById('detail').value
        }

        Axios.post('/api/review/submit', variables)
            .then(response => {
                if(response.data.success) {
                }else {
                    alert('등록 실패')
                }
            })
    }
    
    return (
        <div style = {{ width: '100%', margin: '0'}}>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h2>Review</h2><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h3>Movie Info</h3><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Star Ratings</h3>
                <RatingPage/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Tags</h3>
                <TagsPage/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Review</h3>
                <h4>one-line</h4>
                <TextArea id='one-line' rows={1} placeholder="한줄평을 적어주세요." maxLength={50}/>
                <br />
                <br />
                <h4>detail</h4>
                <TextArea id='detail' rows={4} placeholder="상세 리뷰를 적어주세요."/>
            </div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <Button onClick={onClickSubmit}>submit!</Button>
            </div>
        </div>
    )
}


export default Review