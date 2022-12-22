import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

import { AntDesignOutlined } from '@ant-design/icons';
function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        // const endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=b6dc978c848a223195592bdee19dcbab&language=en-US&page=1';
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([response.results])
            setMainMovieImage(response.results[0])
            console.log(Movies)
        })
    }, [])
    return (
        <div style = {{ width: '100%', margin: '0'}}>
            {/* Main Image */}
            {MainImage && 
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}/>
            }
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies[0] && Movies[0].map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image = {movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>

            <div style= {{ display: 'flex', justfycontent: 'center'}}>
                <button> Load More</button>
            </div>
        
        </div>

    )
}

export default LandingPage
