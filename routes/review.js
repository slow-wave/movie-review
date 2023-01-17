const express = require("express");
const router = express.Router();
const { Review } = require("../models/Review");
const { Tag } = require("../models/Tag");

router.post("/submit", async (req, res, next) => {
  try {
    const review = new Review(req.body);
    await review.save();
    const tag = new Tag({ _id: review._id, tagArray: req.body.tagArray });
    await tag.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/edit", async (req, res) => {
  var currentVal = { _id: req.body._id };
  var newVal = { $set: req.body };
  try {
    await Review.updateOne(currentVal, newVal);
    await Tag.updateOne(currentVal, newVal);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/getReview", (req, res) => {
  Review.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "detailed",
      },
    },
  ]).exec((err, reviews) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, reviews });
  });
});

router.post("/getOneReview", (req, res) => {
  Review.find(req.body).exec((err, review) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, review });
  });
});

router.post("/getTag", (req, res) => {
  Tag.find(req.body).exec((err, tags) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, tags });
  });
});

module.exports = router;
