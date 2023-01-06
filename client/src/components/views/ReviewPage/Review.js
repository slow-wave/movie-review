import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import TagsPage from './Sections/Tags'
import RatingPage from './Sections/Rating'
import ContentPage from './Sections/Content'

function Review(props) {
    const userId = props.match.params.userId;
    const movieId = props.match.params.movieId;

    const onClickSubmit = () => {

    }
    
    return (
        <div style = {{ width: '100%', margin: '0'}}>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h2>Review</h2><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}><h3>Movie Info</h3><hr /></div>
            <div style = {{ width: '85%', margin: '1rem auto'}}>
                <h3>Star Ratings</h3>
                <RatingPage/>
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