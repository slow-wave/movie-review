import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Favorite(props) {
    const movieId= props.movieId
    const userFrom= props.userFrom
    const movieTitle= props.movieInfo.title
    const moviePost= props.movieInfo.backdrop_path
    const movieRunTime= props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber',variables)
            .then(response => {
                setFavoriteNumber(response.data.FavoriteNumber)
                if(response.data.success) {
                    console.log(response.data)

                } else {
                    alert('숫자 정보 가져오기 실패')
                }
            })
        
        Axios.post('/api/favorite/favorited',variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                    console.log(response.data)

                } else {
                    alert('정보 가져오기 실패')
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