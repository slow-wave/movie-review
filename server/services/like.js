const { ObjectId } = require("mongodb");
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//좋아요 수 조회
exports.getLikes = async (commentId) => {
  try {
    let result = await Like.find({ commentId: commentId });
    return result;
  } catch (err) {
    console.log("[like.service][getLikes][error]");
  }
};

//좋아요 등록
exports.addLike = async (userId, commentId) => {
  try {
    let data = await new Like({ userId, commentId });
    data.save();
    await Dislike.findOneAndDelete({ userId, commentId });
  } catch (err) {
    console.log("[like.service][addLike][error]");
  }
};

//좋아요 삭제
exports.deleteLike = async (userId, commentId) => {
  try {
    await Like.findOneAndDelete({ userId, commentId });
  } catch (err) {
    console.log("[like.service][deleteLike][error]");
  }
};

//싫어요 조회
exports.getDislikes = async (commentId) => {
  try {
    let result = await Dislike.find({ commentId: ObjectId(commentId) });
    return result;
  } catch (err) {
    console.log("[favorite.service][getDislikes][error]");
  }
};

//싫어요 등록
exports.addDislike = async (userId, commentId) => {
  try {
    let data = await new Dislike({ userId, commentId });
    data.save();
    await Like.findOneAndDelete({ userId, commentId });
  } catch (err) {
    console.log("[like.service][addDislike][error]");
  }
};

//싫어요 삭제
exports.deleteDislike = async (userId, commentId) => {
  try {
    await Dislike.findOneAndDelete({ userId, commentId });
  } catch (err) {
    console.log("[like.service][deleteDislike][error]");
  }
};
