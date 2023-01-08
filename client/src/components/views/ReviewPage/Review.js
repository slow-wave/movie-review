import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'
import Axios from 'axios';

const { TextArea } = Input;

function Review(props) {
    const [bestScore, setbestScore] = useState(0)

    const userId = props.match.params.userId;
    const movieId = props.match.params.movieId;

    const onClickSubmit = (event) => {
        console.log(bestScore)

        let variables = {
            writer : userId,
            movieId,
            mainContent: document.getElementById('one-line').value,
            comment: document.getElementById('detail').value,
            ratingTotal : bestScore
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
                <RatingPage bestscore={setbestScore}/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Tags</h3>
                <TagsPage/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <ContentPage/>
            </div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <Button onClick={onClickSubmit}>submit!</Button>
            </div>
        </div>
    )
}


export default Review