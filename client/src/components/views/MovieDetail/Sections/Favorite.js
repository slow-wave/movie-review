import React, { useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {
    const movieId= props.movieId
    const userFrom= props.userFrom
    const movieTitle= props.movieInfo.title
    const moviePost= props.movieInfo.backdrop_path
    const movieRunTime= props.movieInfo.runtime

    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber',variables)
            .then(response => {
                if(response.data.succee) {

                } else {
                    alert('실패')
                }
            })

    },[])


    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite