import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../commons/GridCards'
import { Row, Button } from 'antd';
import { Input } from 'antd';

const { Search } = Input;

function SearchMovie() {
    const [Movies, setMovies] = useState([])
    const [CurrentSearchPage, setCurrentSearchPage] = useState(1)
    const [SearchTerm, setSearchTerm] = useState('')

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results])
                setCurrentSearchPage(response.page)
            }) 
    }

    const updateSearchTerms = (newSearchTerm) => {
        const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${CurrentSearchPage}&query=${newSearchTerm}`;
        // setCurrentSearchPage(1)
        // setMovies([])
        fetchMovies(endpoint)
        setSearchTerm(newSearchTerm)
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${CurrentSearchPage + 1}&query=${SearchTerm}`;
        fetchMovies(endpoint)
    }

    return (
        <div style = {{ width: '100%', margin: '0'}}>
            <div style = {{ width: '85%', margin: '1rem auto', display:'flex', justifyContent:'flex-end'}}>
                <Search
                    onSearch={updateSearchTerms}
                    placeholder="Search By Typing"
                />
            
            </div>
                <div style = {{ width: '85%', margin: '1rem auto'}}>
                    <h2>Results</h2>
                    <hr />

                    {/* Movie Grid Cards */}
                    <Row gutter={[16, 16]}>
                        {Movies[0] && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image = {movie.poster_path ?
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                    <div style= {{ display: 'flex', justfycontent: 'center'}}>
                        <Button onClick={loadMoreItems}> Load More</Button>
                    </div>
                </div>

        </div>
    )
}

export default SearchMovie