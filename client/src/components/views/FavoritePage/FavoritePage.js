import './favorite.css'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IMAGE_BASE_URL } from '../../Config'
import { Popover, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons';

function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);

    useEffect(()=> {
        fetchFavoredMovie()
        // checkReview()
    },[])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                console.log(response.data.favorites[0].detailed)
                setFavorites(response.data.favorites)
            }else {
                alert("영화 정보 가져오기 실패")
            }
        })
    }
    
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success) {
                fetchFavoredMovie()
            }else {
                alert("favorite 삭제 실패")
            }
        })
    } 

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/>:"no image"}
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
            <td>
                {/* 작성된 리뷰가 없다면 '리뷰 버튼' 활성화 */}
                {(favorite.detailed.length == 0 &&
                    <Button href={`/review/submit/${favorite.movieId}`}>새로 작성<EditOutlined /></Button>
                )} 
                {/* 작성된 리뷰가 있다면 '수정 버튼' 활성화 */}
                {(favorite.detailed.length != 0 &&
                    <Button>등록 완료</Button>
                )}
            </td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorite</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                   {renderCards}
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage