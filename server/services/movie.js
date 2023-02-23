const { Movie } = require("../models/Movie");

//영화 정보 등록
exports.addMovie = async (movie) => {
  try {
    let data = await new Movie(movie);
    data.save();
  } catch (err) {
    console.error("[movie.service][addMovie][error]");
  }
};
