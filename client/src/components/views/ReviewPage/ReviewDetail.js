import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import RatingPage from './Sections/Rating'
import { Button, Tag, Card, Space, Typography } from 'antd';
const { Text } = Typography;
function ReviewDetail(props) {
    const [Review, setReview] = useState([])
    const [bestScore, setbestScore] = useState(0)
    const [Tags, setTags] = useState([])
    
    const location = useLocation();
    const image = location.state.image
    const movieName = location.state.movieName

    let reviewId = props.match.params.reviewId

    useEffect(()=> {
        fetchReview()
        fetchTag()
    },[])

    const fetchReview = () => {
        Axios.post('/api/review/getOneReview', { _id: reviewId })
        .then(response => {
            if(response.data.success) {
                console.log('data',response.data)
                setReview(response.data.review[0])
            }else {
                alert("리뷰 정보 가져오기 실패")
            }
        })
    }

    const fetchTag = () => {
        Axios.post('/api/review/getTag', { reviewId: reviewId})
        .then(response => {
            if(response.data.success) {
                setTags(response.data.tags)
            }else {
                alert("리뷰 정보 가져오기 실패")
            }
        })
    }
    
    return (
        <div>
            <div style = {{ width: '100%', margin: '0'}}>
                <div style = {{ width: '85%', margin: '1rem auto'}}><h2>Review</h2><hr />
                    <div style={{display:'flex'}}>
                        <div style = {{ flex:'1'}}>
                            <h3>Movie Info</h3>
                            <a href={`/movie/${Review.movieId}`}>
                                <img style={{ width:'30%'}} src={image} alt={movieName}/>
                            </a>
                        </div>
                        <div style={{flex:'1'}}>
                            <div style = {{ width: '85%', margin: '1rem auto'}}>
                                <h3><Text mark>Star Ratings</Text></h3>
                                <RatingPage
                                    showRating
                                    setbestScore={setbestScore}
                                    score={Review.ratingTotal}
                                />
                            </div>
                            <div style = {{ width: '85%', margin: '1rem auto'}}>
                                <h3><Text mark>Tags</Text></h3>
                                { Tags && Tags.map((tag, index) => (
                                    <Tag>{tag.tagName}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h3><Text mark>Review</Text></h3>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Card title="one-line">
                            <p>{Review.comment}</p>
                        </Card>
                        <Card title="detail">
                            <p>{Review.mainContent}</p>
                        </Card>
                    </Space>
                </div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <Button>수정</Button>
                </div>
            </div>
        </div>

    )
}

export default ReviewDetail
