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

        // Reviews.map(review => {
        //     const endpointInfo = `${API_URL}movie/${review.movieId}?api_key=${API_KEY}`
        //     fetchMovies(endpointInfo)
        // });
        // console.log('movie', Movies)
    },[])

    const fetchReview = () => {
        Axios.post('/api/review/getReview', { writer: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setReviews(response.data.reviews)
            }else {
                alert("리뷰 정보 가져오기 실패")
            }
        })
    }

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, response])
            })
    }

    return (
        <div>
            <div>ReviewShow</div>

            {/* Review Grid Cards */}
            <Row gutter={[16, 16]}>
            {Reviews && Reviews.map((review, index) => (
                <React.Fragment key={index}>
                    <GridCards
                        reviewPage
                        reviewId = {review._id}
                        // image = {movie.poster_path ?
                        //     `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={review.movieId}
                        // movieName={movie.original_title}
                    />
                </React.Fragment>
            ))}
            </Row>
        </div>
    )
}

export default ReviewShow