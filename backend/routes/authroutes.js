const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  register,
  login,
  getMe,
  getUserProfile,
  googleCallback,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/users/:userId/profile", auth, getUserProfile);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "/login",
    session: false 
  }),
  googleCallback
);

module.exports = router;
