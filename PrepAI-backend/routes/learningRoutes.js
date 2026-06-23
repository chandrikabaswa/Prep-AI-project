const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecommendedLearning,
} = require("../controllers/learningController");

router.get(
  "/recommended",
  protect,
  getRecommendedLearning
);

module.exports = router;