const MovieService = require("../services/movie");

//영화 정보 등록
exports.addMovie = async (req, res, next) => {
  try {
    let movie = req.body;
    console.log(movie);
    await MovieService.addMovie(movie);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[movie.controller][addMovie][error]");
    return res.status(500).json(err);
  }
};
