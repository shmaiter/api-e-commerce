const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test successfull");
});

router.post("/userpost", (req, res) => {
  username = req.body.username;
  res.send(`Your user name is: ${username}`);
});

module.exports = router;
