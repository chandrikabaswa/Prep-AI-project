const express = require("express");

const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const {
  analyzeResumeController,
} = require("../controllers/resumeController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  analyzeResumeController
);

module.exports = router;