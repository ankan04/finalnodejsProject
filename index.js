const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authroute = require("./api/routes/auth");
const usersroute = require("./api/routes/users");
const postroute = require("./api/routes/post");

const authMdiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, "mysecret");
    req.user = jwt.decode(token);
    next();
  } catch (err) {
    res.status(401).json(err);
    return 0;
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(console.log("connected to mongodb"))
  .catch(console.error);

const port = 3000;

console.log("hello");

app.get("/ankan", (req, res) => {
  res.send("hello ankan");
});

// main()
//     .then(console.log)
//     .catch(console.error)

app.use("/api/auth", authroute);
app.use(authMdiddleware);
app.use("/api/users", usersroute);
app.use("/api/post", postroute);

app.listen(port, () => {
  console.log("server started");
});
