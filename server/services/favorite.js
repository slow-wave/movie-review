const { Favorite } = require("../models/Favorite");

//리뷰 목록 조회
exports.getFavorites = (userId) => {
  try {
    let data = Favorite.aggregate([
      {
        $match: {
          $expr: { $eq: ["$userFrom", { $toObjectId: userId }] },
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "movieId",
          foreignField: "movieId",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$writer", { $toObjectId: userId }] },
              },
            },
          ],
          as: "detailed",
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "detailedMovie",
        },
      },
    ]);
    return data;
  } catch (err) {
    console.log("[favorite.service][getFavorites][error]");
  }
};

//영화별 좋아요 수 가져오기
exports.getLikes = async (movieId) => {
  try {
    let data = Favorite.find({ movieId });
    return data;
  } catch (err) {
    console.log("[favorite.service][getLikes][error]");
  }
};

//즐겨찾기 여부 조회
exports.getFavorite = (userId, movieId) => {
  try {
    let data = Favorite.find({
      userFrom: userId,
      movieId: movieId,
    });
    let result = false;
    if (data.length !== 0) {
      result = true;
    }
    return result;
  } catch (err) {
    console.log("[favorite.service][getFavorite][error]");
  }
};

//즐겨찾기 등록
exports.addFavorite = (userId, movieId) => {
  try {
    let data = new Favorite({ userFrom: userId, movieId });
    data.save();
  } catch (err) {
    console.log("[favorite.service][addFavorite][error]");
  }
};

//즐겨찾기 삭제
exports.deleteFavorite = async (userId, movieId) => {
  try {
    await Favorite.deleteOne({
      userFrom: userId,
      movieId,
    });
  } catch (err) {
    console.log("[favorite.service][deleteFavorite][error]");
  }
};
