const process = require("process");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes");
const cardRouter = require("./routes/cardRoutes");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

const app = express();
app.listen(PORT);

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6256c0ad1c0b85e31c21a7fc",
  };

  next();
});
app.use(userRouter);
app.use(cardRouter);

console.log(`Start at port ${PORT}`);
