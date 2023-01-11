import React, { useState } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'
import SimpleMovieInfoPage from './Sections/SimpleMovieInfo';
import { Button, Typography } from 'antd';

const { Text } = Typography;

function Review(props) {
    const [bestScore, setbestScore] = useState(0)
    const [tags, setTags] = useState([]);
    const location = useLocation();

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
        <div style= {{ width: '85%', margin: '1rem auto'}}>
            <h2>Review</h2><hr />
            <div style= {{ width: '85%', margin: '1rem auto', display:'flex'}}>
                <div style= {{ width: '85%', margin: '1rem auto',flex:'1'}}>
                    <h3><Text mark>Movie Info</Text></h3>
                    <SimpleMovieInfoPage movieId={movieId} image={location.state.movieInfo.poster_path} alt={location.state.movieInfo.original_title}/>
                </div>
                <div style={{flex:'1'}}>
                    <div style= {{ width: '85%', margin: '1rem auto'}}>
                        <h3><Text mark>Star Ratings</Text></h3>
                        <RatingPage submitRating setbestScore={setbestScore}/>
                    </div>
                    <div style= {{ width: '85%', margin: '1rem auto'}}>
                        <h3><Text mark>Tags</Text></h3>
                        <TagsPage setTags={setTags} tags={tags}/>
                    </div>
                </div>
            </div>
            <div style= {{ width: '85%', margin: '1rem auto'}}>
                <h3><Text mark>Review</Text></h3>
                <ContentPage/>
            </div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <Button onClick={onClickSubmit}>submit!</Button>
            </div>
        </div>
    )
}


export default Review