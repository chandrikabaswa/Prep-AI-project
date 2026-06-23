const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getQuestions,
} = require("../controllers/interviewController");

router.get("/", protect, getQuestions);

module.exports = router;