const { Review } = require("../models/Review");

//리뷰 목록 조회
exports.getReviews = (userId) => {
  try {
    let data = Review.aggregate([
      {
        $match: {
          $expr: { $eq: ["$writer", { $toObjectId: userId }] },
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "detailed",
        },
      },
    ]);
    return data;
  } catch (err) {
    console.log("[review.service][getReviews][error]");
  }
};

//리뷰 상세 조회
exports.getReview = (reviewId) => {
  try {
    let data = Review.find({ _id: reviewId });
    return data;
  } catch (err) {
    console.error("[review.service][getReview][error]");
  }
};

//리뷰 등록
exports.createReview = (review) => {
  try {
    let data = new Review(review);
    data.save();
  } catch (err) {
    console.error("[review.service][createReview][error]");
  }
};

//리뷰 수정
exports.updateReview = async (reviewId, newVal) => {
  try {
    let result = await Review.updateOne({ _id: reviewId }, newVal);
    console.log("[review.service][updateReview][success]", result);
  } catch (err) {
    console.error("[review.service][updateReview][error]");
  }
};

//리뷰 삭제
exports.deleteReview = async (reviewId) => {
  try {
    let result = await Review.deleteOne({ _id: reviewId });
    console.log("[review.service][deleteReview][success]", result);
  } catch (err) {
    console.error("[review.service][deleteReview][error]");
  }
};
