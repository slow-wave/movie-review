const FavoriteService = require("../services/favorite");

//사용자별 즐겨찾기 목록 조회
exports.getFavorites = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let result = await FavoriteService.getFavorites(userId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[favorite.controller][getFavorites][error]");
    return res.status(500).json(err);
  }
};

//영화별 즐겨찾기 수 가져오기
exports.getFavoriteNum = async (req, res, next) => {
  try {
    let movieId = req.params.movieId;
    let result = await FavoriteService.getFavoriteNum(movieId);
    res.status(200).json({ success: true, favoriteNumber: result.length });
  } catch (err) {
    console.error("[favorite.controller][getFavoriteNum][error]");
    return res.status(500).json(err);
  }
};

//즐겨찾기 여부 조회
exports.getFavorite = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let movieId = req.params.movieId;
    let result = FavoriteService.getFavorite(userId, movieId);
    let favorited = false;
    if (result.length !== 0) {
      favorited = true;
    }
    return res.status(200).json({ success: true, favorited });
  } catch (err) {
    console.error("[favorite.controller][getFavorite][error]");
    return res.status(500).json(err);
  }
};

//즐겨찾기 등록
exports.addFavorite = (req, res, next) => {
  try {
    let userId = req.params.userId;
    let movieId = req.params.movieId;
    let result = FavoriteService.addFavorite(userId, movieId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[favorite.controller][addFavorite][error]");
    return res.status(500).json(err);
  }
};

//즐겨찾기 삭제
exports.deleteFavorite = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let movieId = req.params.movieId;
    let result = await FavoriteService.deleteFavorite(userId, movieId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[favorite.controller][deleteFavorite][error]");
    return res.status(500).json(err);
  }
};
