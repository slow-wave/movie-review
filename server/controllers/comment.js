const CommentService = require("../services/comment");

//리뷰 목록 조회
exports.getComments = async (req, res, next) => {
  try {
    let movieId = req.params.movieId;
    let result = await CommentService.getComments(movieId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[comment.controller][getComments][error]");
    return res.status(500).json(err);
  }
};

//댓글 생성
exports.createComment = async (req, res, next) => {
  try {
    let comment = req.body;
    let result = await CommentService.createComment(comment);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[comment.controller][createComment][error]");
    return res.status(500).json(err);
  }
};

//댓글 삭제
exports.deleteComment = async (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    await CommentService.deleteComment(commentId);
  } catch (err) {
    console.error("[comment.controller][deleteComment][error]");
    return res.status(500).json(err);
  }
};
