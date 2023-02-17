const ReviewService = require("../services/review");

//리뷰 목록 조회
exports.getReviews = async (req, res, next) => {
  let userId = req.params.userId;
  try {
    let result = await ReviewService.getReviews(userId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[review.controller][getReviews][error]");
    return res.status(500).json(err);
  }
};

//리뷰 상세 조회
exports.getReview = async (req, res, next) => {
  let reviewId = req.params.reviewId;
  try {
    let result = await ReviewService.getReview(reviewId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[review.controller][getReview][error]");
    return res.status(500).json(err);
  }
};

//리뷰 등록
exports.createReview = async (req, res, next) => {
  try {
    let review = req.body;
    let result = await ReviewService.createReview(review);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[review.controller][createReview][error]");
    return res.status(500).json(err);
  }
};

//리뷰 수정
exports.updateReview = (req, res, next) => {
  try {
    let currentVal = { _id: req.params.reviewId };
    let newVal = { $set: req.body };
    ReviewService.updateReview(currentVal, newVal);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[review.controller][updateReview][error]");
    return res.status(500).json(err);
  }
};

//리뷰 삭제
exports.deleteReview = (req, res, next) => {
  try {
    let reviewId = req.params.reviewId;
    ReviewService.deleteReview(reviewId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[review.controller][deleteReview][error]");
    return res.status(500).json(err);
  }
};
