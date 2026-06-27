const Learning = require("../models/Learning");
const User = require("../models/User");

const {
  generateLearningRecommendations,
} = require("../services/groqService");

const getRecommendedLearning = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userSkills = (user.skills || []).map((skill) =>
      skill.toLowerCase().trim()
    );

    const userGoal = (user.goal || "").toLowerCase().trim();

    const topics = await Learning.find();

    const recommendations = topics.filter((topic) => {
      // Case-insensitive goal match
      const goalMatch = topic.goals.some(
        (goal) =>
          goal.toLowerCase().trim() === userGoal
      );

      // Check if prerequisites are met
      const prerequisiteMet =
        topic.skills.length === 0 ||
        topic.skills.some((skill) =>
          userSkills.includes(skill.toLowerCase().trim())
        );

      // Don't recommend if the user already knows this topic
      const alreadyKnows = userSkills.includes(
        topic.title.toLowerCase().trim()
      );

      return (
        goalMatch &&
        prerequisiteMet &&
        !alreadyKnows
      );
    });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAILearningRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let result = await generateLearningRecommendations(user);

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = result.indexOf("[");
    const end = result.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("AI did not return valid JSON.");
    }

    result = result.substring(start, end + 1);

    const recommendations = JSON.parse(result);

    res.json(recommendations);
  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendedLearning,
  getAILearningRecommendations,
};