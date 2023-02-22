var express = require("express");
var router = express.Router();
const LikeController = require("../controllers/like");

//좋아요 수 조회
router.get("/:commentId/likes", LikeController.getLikes);
//좋아요 등록
router.post("/:userId/:commentId/likes", LikeController.addLike);
//좋아요 삭제
router.delete("/:userId/:commentId/likes", LikeController.deleteLike);

//싫어요 수 조회
router.get("/:commentId/dislikes", LikeController.getDislikes);
//싫어요 등록
router.post("/:userId/:commentId/dislikes", LikeController.addDislike);
//싫어요 삭제
router.delete("/:userId/:commentId/dislikes", LikeController.deleteDislike);

module.exports = router;
