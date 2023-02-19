var express = require("express");
var router = express.Router();
const ReviewController = require("../controllers/review");

//리뷰 목록 조회
router.get("/:userId/reviews", ReviewController.getReviews);
//리뷰 상세 조회
router.get("/reviews/:reviewId", ReviewController.getReview);
//리뷰 등록
router.post("/reviews", ReviewController.createReview);
//리뷰 수정
router.patch("/reviews/:reviewId", ReviewController.updateReview);
//리뷰 삭제
router.delete("/reviews/:reviewId", ReviewController.deleteReview);

module.exports = router;
