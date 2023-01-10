import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function ReviewShow() {
    const [Reviews, setReviews] = useState([])
    const [Movies, setMovies] = useState([])

    useEffect(()=> {
        fetchReview()
    },[])

    const fetchReview = () => {
        Axios.post('/api/review/getReview', { writer: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                setReviews(response.data.reviews)
            }else {
                alert("리뷰 정보 가져오기 실패")
            }
        })
    }

    return (
        <div>
            {/* Review Grid Cards */}
            <Row gutter={[16, 16]}>

            {Reviews && Reviews.map((review, index) => (
                <React.Fragment key={index}>
                    <GridCards
                        reviewPage
                        reviewId = {review._id}
                        image = {review.detailed[0].poster_path ?
                            `${IMAGE_BASE_URL}w500${review.detailed[0].poster_path}` : null}
                        movieId={review.movieId}
                        movieName={review.detailed[0].original_title}
                    />
                </React.Fragment>
            ))}
            </Row>
        </div>
    )
}

export default ReviewShow