var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user");
const { auth } = require("../middleware/auth");

//영화 정보 등록
router.get("/auth", auth, UserController.auth);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/users/:userId/nickname", UserController.getUserInfo);

module.exports = router;
