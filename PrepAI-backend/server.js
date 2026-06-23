const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const learningRoutes = require("./routes/learningRoutes");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const internshipRoutes = require("./routes/internshipRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const aiInterviewRoutes = require("./routes/aiInterviewRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/ai-interview", aiInterviewRoutes);

app.get("/", (req, res) => {
  res.send("PrepAI Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Gemini Key:", process.env.GEMINI_API_KEY);