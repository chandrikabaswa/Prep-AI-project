const Internship = require("../models/Internship");
const User = require("../models/User");

// Get all internships
const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();

    res.json(internships);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get recommended internships
const getRecommendedInternships = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const internships = await Internship.find();

    const recommendations = internships
      .map((internship) => {
        const userSkills = user.skills.map((skill) =>
          skill.toLowerCase().trim()
        );

        const matchedSkills = internship.skills.filter((skill) =>
          userSkills.includes(skill.toLowerCase().trim())
        );

        const missingSkills = internship.skills.filter(
          (skill) =>
            !userSkills.includes(skill.toLowerCase().trim())
        );

        const match = Math.round(
          (matchedSkills.length / internship.skills.length) * 100
        );

        return {
          ...internship.toObject(),
          match,
          matchedSkills,
          missingSkills,
        };
      })
      .filter((internship) => internship.match > 0)
      .sort((a, b) => b.match - a.match);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get internship by ID
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllInternships,
  getRecommendedInternships,
  getInternshipById,
};