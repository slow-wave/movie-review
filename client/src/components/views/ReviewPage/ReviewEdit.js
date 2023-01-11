import React, { useState } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'
import { Button } from 'antd';


function ReviewEdit(props) {
    const [bestScore, setbestScore] = useState(0)
    const [tags, setTags] = useState([]);
    const location = useLocation();
    console.log(location)
    let userId = localStorage.getItem('userId')
    let movieId = props.match.params.movieId;

    const onClickSubmit = (event) => {
        let variables = {
            writer : userId,
            movieId,
            mainContent: document.getElementById('one-line').value,
            comment: document.getElementById('detail').value,
            ratingTotal : bestScore,
            tags: tags
        }

        Axios.post('/api/review/submit', variables)
            .then(response => {
                if(response.data.success) {
                    alert('리뷰를 등록했습니다!')
                } else {
                    alert('등록 실패')
                }
            })

        Axios.post('/api/review/getReview', { writer: localStorage.getItem('userId'), movieId: movieId})
            .then(response => {
                if(response.data.success) {
                    var link = `/review/${response.data.reviews[0]._id}`;
                    window.location.href=link;
                }else {
                    alert("리뷰 정보 가져오기 실패")
                }
            })

    }
    
    return (
        <div style = {{ width: '100%', margin: '0'}}>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h2>Review</h2><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h3>Movie Info</h3><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Star Ratings</h3>
                <RatingPage submitRating setbestScore={setbestScore}/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Tags</h3>
                <TagsPage setTags={setTags} tags={tags}/>
            <hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Review</h3>
                <ContentPage/>
            </div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <Button onClick={onClickSubmit}>submit!</Button>
            </div>
        </div>
    )
}


export default ReviewEdit