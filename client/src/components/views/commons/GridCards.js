import React from 'react'
import { Link } from 'react-router-dom';
import { Col } from 'antd';

function GridCards(props) {
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style = {{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width:'100%',height:'320px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    } else if (props.reviewPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style = {{ position: 'relative'}}>
                    <Link to={{pathname: `/review/${props.reviewId}`, state:{ movieId: props.movieId }}}> 
                        <img style={{ width:'100%',height:'320px'}} src={props.image} alt={props.movieName}/>
                    </Link>
                    {/* <a href={`/review/${props.reviewId}`}>
                        <img style={{ width:'100%',height:'320px'}} src={props.image} alt={props.movieName}/>
                    </a> */}
                </div>
        </Col>
        )

    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style = {{ position: 'relative'}}>
                    <img style={{ width:'100%',height:'320px'}} src={props.image} alt={props.characterName}/>
                </div>
            </Col>
        )
    }
}

export default GridCards