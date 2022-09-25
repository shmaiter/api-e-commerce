const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//
// .............. REGISTER ..............
//
router.post("/register", async (req, res) => {
  // new User builds by the mongo schema from models
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    // saved to mongo database
    const savedUser = await newUser.save();
    // status 201, is successfully added
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// .............. lOGIN ..............
//
router.post("/login", async (req, res) => {
  try {
    // Validate the user exists in mongo database
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    !user && res.status(401).json("Wrong credentials");

    // const dbHashedPassword = user.password;
    // Decrypt the hash into a sequence of numbers
    const dbHashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    // Parse the sequence of numbers into the actual user password
    const password = dbHashPassword.toString(CryptoJS.enc.Utf8);
    console.log(password);
    // const loginHashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    // console.log("loginHashedPassword: " + loginHashedPassword);
    // console.log("dbHashedPassword: " + dbHashedPassword);

    password !== req.body.password && res.status(401).json("Wrong credentials");

    res.status(200).json(user);
  } catch (err) {}
});

module.exports = router;
