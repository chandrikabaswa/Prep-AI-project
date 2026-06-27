const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecommendedLearning,
  getAILearningRecommendations,
} = require("../controllers/learningController");
router.get(
  "/recommended",
  protect,
  getRecommendedLearning
);

router.get(
  "/ai-recommended",
  protect,
  getAILearningRecommendations
);

module.exports = router;