const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).render("users/success", { user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.status(200).render("users/success", { user: user });
  } catch (err) {
    console.error("Error", err);
    res.status(400).json({ error: err.message });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  if (req.isAuthenticated) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = { registerUser, loginUser, currentUser };
