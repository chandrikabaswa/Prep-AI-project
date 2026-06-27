const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecommendedProjects,
  getAIRecommendedProjects,
  getProjectById,
  getAllProjects,
} = require("../controllers/projectController");

router.get("/recommended", protect, getRecommendedProjects);

router.get("/ai-recommended", protect, getAIRecommendedProjects);

router.get("/:id", protect, getProjectById);

router.get("/", protect, getAllProjects);

module.exports = router;