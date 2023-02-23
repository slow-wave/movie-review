var express = require("express");
var router = express.Router();
const CommentController = require("../controllers/comment");

//댓글 목록 조회
router.get("/comments/:movieId", CommentController.getComments);
//댓글 저장
router.post("/comments", CommentController.createComment);
//댓글 삭제
router.delete("/comments/:commentId", CommentController.deleteComment);

module.exports = router;
