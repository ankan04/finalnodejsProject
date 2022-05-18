const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    //const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
      status: "active",
    }).lean();
    !user && res.status(400).json("wrong credantials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("wrong credantials");
    const token = jwt.sign({ ...user }, "mysecret");

    res.status(200).json({ ...user, token, password: undefined });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
