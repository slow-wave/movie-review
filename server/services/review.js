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
exports.getReview = async (reviewId) => {
  try {
    let data = Review.find({ _id: reviewId });
    return data;
  } catch (err) {
    console.error("[review.service][getReview][error]");
  }
};

//리뷰 등록
exports.createReview = async (review) => {
  try {
    let data = new Review(review);
    data.save();
  } catch (err) {
    console.error("[review.service][createReview][error]");
  }
};

//리뷰 수정
exports.updateReview = (currentVal, newVal) => {
  try {
    Review.updateOne(currentVal, newVal);
  } catch (err) {
    console.error("[review.service][updateReview][error]");
  }
};

//리뷰 삭제
exports.deleteReview = (reviewId) => {
  try {
    Review.findOneAndDelete({ _id: reviewId });
  } catch (err) {
    console.error("[review.service][deleteReview][error]");
  }
};
