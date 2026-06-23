const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
  signup,
  login,
  updateProfile,
  getProfile,
} = require("../controllers/userController");

router.post("/signup", signup);

router.post("/login", login);

router.put("/profile", protect, updateProfile);

router.get("/profile", protect, getProfile);
module.exports = router;