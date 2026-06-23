const Learning = require("../models/Learning");
const User = require("../models/User");

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

module.exports = {
  getRecommendedLearning,
};