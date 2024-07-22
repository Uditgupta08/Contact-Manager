const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/register", (req, res) => {
  res.render("users/register");
});

userRouter.post("/register", registerUser);

userRouter.get("/login", (req, res) => {
  res.render("users/login");
});

userRouter.post("/login", loginUser);

userRouter.get("/current", verifyToken, currentUser);

module.exports = userRouter;
