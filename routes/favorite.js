const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // 몽고DB에서 favorite 숫자 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 프론트에 숫자 정보 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMovie", (req, res) => {
  Favorite.aggregate([
    {
      $match: {
        $expr: { $eq: ["$userFrom", { $toObjectId: req.body.userFrom }] },
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
              $expr: { $eq: ["$writer", { $toObjectId: req.body.userFrom }] },
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
  ]).exec((err, favorites) => {
    try {
      return res.status(200).json({ success: true, favorites });
    } catch {
      res.status(400).send(err);
    }
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
