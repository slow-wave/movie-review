var express = require("express");
var router = express.Router();
const MovieController = require("../controllers/movie");

//영화 정보 등록
router.post("/movies/:movieId", MovieController.addMovie);

module.exports = router;
