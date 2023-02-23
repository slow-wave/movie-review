const { Comment } = require("../models/Comment");

//댓글 조회
exports.getComments = async (movieId) => {
  try {
    let data = await Comment.find({ movieId });
    return data;
  } catch (err) {
    console.log("[comment.service][getComments][error]");
  }
};

//댓글 생성
exports.createComment = async (comment) => {
  try {
    let data = await new Comment(comment);
    data.save();
  } catch (err) {
    console.log("[comment.service][createComment][error]");
  }
};

//댓글 삭제
exports.deleteComment = async (commentId) => {
  try {
    await Comment.findOneAndDelete({ _id: commentId });
  } catch (err) {
    console.log("[comment.service][deleteComment][error]");
  }
};
