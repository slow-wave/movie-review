import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Button, Tag } from 'antd';
import { FaStar } from 'react-icons/fa';

function ReviewDetail(props) {
    const [Review, setReview] = useState([])
    const [Tags, setTags] = useState([])

    useEffect(()=> {
        fetchReview()
        fetchTag()
    },[])

    const fetchReview = () => {
        Axios.post('/api/review/getReview', { _id: props.match.params.reviewId})
        .then(response => {
            if(response.data.success) {
                setReview(...Review, response.data.reviews[0])
            }else {
                alert("리뷰 정보 가져오기 실패")
            }
        })
    }

    const fetchTag = () => {
        Axios.post('/api/review/getTag', { reviewId: props.match.params.reviewId})
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
                <div style = {{ width: '85%', margin: '1rem auto'}}><h2>Review</h2><hr /></div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h3>Movie Info</h3>
                    <a href={`/movie/${Review.movieId}`}>link</a>
                <hr /></div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h3>Star Ratings</h3>
                        {[...Array(parseInt(Review.ratingTotal))].map((el, idx) => {
                            return (
                                <FaStar
                                    id='rating'
                                    size="50"
                                    color="#fcc419"
                                />
                            );
                        })}
                <hr /></div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h3>Tags</h3>
                    { Tags && Tags.map((tag, index) => (
                        <Tag>{tag.tagName}</Tag>
                    ))}
                <hr /></div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h3>Review</h3>
                    <h4>one-line</h4>
                    <p>{Review.comment}</p>
                </div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h4>detail</h4>
                    <p>{Review.mainContent}</p>
                </div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <Button>수정</Button>
                </div>
            </div>
        </div>

    )
}

export default ReviewDetail
