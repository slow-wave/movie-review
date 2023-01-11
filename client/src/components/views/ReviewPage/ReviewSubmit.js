import React, { useState } from 'react';
import Axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'
import SimpleMovieInfoPage from './Sections/SimpleMovieInfo';
import { Button, Typography } from 'antd';

const { Text } = Typography;

function Review(props) {
    const [bestScore, setbestScore] = useState(0)
    const [tags, setTags] = useState([]);
    const data = useLocation().state;
    let history = useHistory();
    let userId = localStorage.getItem('userId')
    let movieId = props.match.params.movieId;

    const onClickSubmit = async (event) => {
        let variables = {
            writer : userId,
            movieId,
            mainContent: document.getElementById('detail').value,
            comment: document.getElementById('one-line').value,
            ratingTotal : bestScore,
            tags: tags
        }

        await Axios.post('/api/review/submit', variables)
            .then(response => {
                if(response.data.success) {
                    alert('리뷰를 등록했습니다!')
                } else {
                    alert('등록 실패')
                }
            })

        await Axios.post('/api/review/getOneReview', { writer: localStorage.getItem('userId'), movieId: movieId})
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    // setReviewId(response.data.reviews[0]._id)
                    history.push({
                        pathname: `/review/${response.data.review[0]._id}`,
                        state:{ image: data.movieInfo.poster_path, movieName: data.movieInfo.original_title}
                      })
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
                    <SimpleMovieInfoPage movieId={movieId} image={data.movieInfo.poster_path} alt={data.movieInfo.original_title}/>
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