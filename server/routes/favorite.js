var express = require("express");
var router = express.Router();
const FavoriteController = require("../controllers/favorite");

//사용자별 즐겨찾기 목록 조회
router.get("/:userId/favorites", FavoriteController.getFavorites);
//영화별 좋아요 수 가져오기
router.get("/:movieId/likes", FavoriteController.getLikes);
//즐겨찾기 여부 조회
router.get("/:userId/:movieId/favorites", FavoriteController.getFavorite);
//즐겨찾기 등록
router.post("/:userId/:movieId/favorites", FavoriteController.addFavorite);
//즐겨찾기 삭제
router.delete("/:userId/:movieId/favorites", FavoriteController.deleteFavorite);

module.exports = router;
