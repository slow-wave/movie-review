const LikeService = require("../services/like");

//좋아요 수 조회
exports.getLikes = async (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    let result = await LikeService.getLikes(commentId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[like.controller][getLikes][error]");
    return res.status(500).json(err);
  }
};

//좋아요 등록
exports.addLike = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let commentId = req.params.commentId;
    await LikeService.addLike(userId, commentId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[like.controller][addLike][error]");
    return res.status(500).json(err);
  }
};

//좋아요 삭제
exports.deleteLike = async (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    await LikeService.deleteLike(userId, commentId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[like.controller][deleteLike][error]");
    return res.status(500).json(err);
  }
};
//싫어요 수 조회
exports.getDislikes = async (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    let result = await LikeService.getDislikes(commentId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[like.controller][getDislikes][error]");
    return res.status(500).json(err);
  }
};

//싫어요 등록
exports.addDislike = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let commentId = req.params.commentId;
    await LikeService.addDislike(userId, commentId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[like.controller][addDislike][error]");
    return res.status(500).json(err);
  }
};

//싫어요 삭제
exports.deleteDislike = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let commentId = req.params.commentId;
    await LikeService.deleteDislike(userId, commentId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[like.controller][deleteDislike][error]");
    return res.status(500).json(err);
  }
};
