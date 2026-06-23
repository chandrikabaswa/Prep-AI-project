const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getAllInternships,
  getRecommendedInternships,
  getInternshipById,
} = require("../controllers/internshipController");

router.get("/", protect, getAllInternships);

router.get(
  "/recommended",
  protect,
  getRecommendedInternships
);

router.get("/:id", protect, getInternshipById);

module.exports = router;