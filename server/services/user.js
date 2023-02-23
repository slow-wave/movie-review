const { User } = require("../models/User");

exports.register = async (user) => {
  try {
    console.log(user);
    let data = await new User({ user });
    data.save();
  } catch (err) {
    console.log("[user.service][register][error]");
  }
};

exports.login = async (email) => {
  try {
    await User.findOne({ email }, (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: "Auth failed, email not found",
        });

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Wrong password" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    });
  } catch (err) {
    console.log("[user.service][login][error]");
  }
};

exports.logout = async (_id, token) => {
  try {
    await User.findOneAndUpdate({ _id }, { token });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("[user.service][logout][error]");
  }
};

exports.getUserInfo = async (_id) => {
  try {
    let result = await User.findOne({ _id });
    return result;
  } catch (err) {
    console.error("[user.service][getUserInfo][error]");
  }
};
