const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
const port = process.env.PORT || 1622;
const mongoUrl = "mongodb://localhost:27017/db_1";
app.use(bodyparser.json());
app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
mongoose.Promise = global.Promise;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected on Port " + port))
  .catch(err => console.log(err));
var Users = require("./routes/Users");
app.use("/users", Users);

app.listen(port);
