const UserService = require("../services/user");

exports.auth = (req, res) => {
  try {
    console.log("auth start");
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
    console.log("auth_id", req.user._id);
  } catch (err) {
    console.error("[user.controller][auth][error]");
    return res.status(500).json(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    let user = req.body;
    await UserService.register(user);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[user.controller][register][error]");
    return res.status(500).json({ success: false, err });
  }
};

exports.login = async (req, res, next) => {
  try {
    let email = req.body.email;
    await UserService.login(email);
  } catch (err) {
    console.error("[user.controller][login][error]");
    return res.status(500).json(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    console.log("req", req);
    let _id = req.user._id;
    let token = { token: "", tokenExp: "" };
    console.log(_id, token);
    await UserService.logout(_id, token);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[user.controller][logout][error]");
    return res.status(500).json({ success: false, err });
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    let _id = req.parmas.userId;
    let result = await UserService.getUserInfo(_id);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("[user.controller][getUserInfo][error]");
    return res.status(500).json(err);
  }
};
