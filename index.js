const express = require("express");
const mongoose = require("mongoose");
const dontenv = require("dotenv");

const app = express();
dontenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
