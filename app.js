const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const CONNECTION_STRING = process.env.CONNECTION_STRING;
mongoose.set("strictQuery", false);

// const indexRouter = require("./routes/index");
// const postsRouter = require("./routes/posts");

const app = express();

// view engine setup to a
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

mongoose.connect(CONNECTION_STRING, { dbName: "movieapp" });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/review", require("./routes/review"));
app.use("/api/movie", require("./routes/movie"));

// Return the client
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public") + "/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// for dev
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server Listening on ${port}`);
// });

module.exports = app;
