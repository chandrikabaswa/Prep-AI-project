const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecommendedProjects,
  getProjectById,
  getAllProjects,
} = require("../controllers/projectController");

router.get("/recommended", protect, getRecommendedProjects);

router.get("/:id", protect, getProjectById);

router.get("/", protect, getAllProjects);

module.exports = router;