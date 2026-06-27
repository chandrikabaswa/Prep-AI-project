const Project = require("../models/Project");
const User = require("../models/User");

const {
  generateProjectRecommendations,
} = require("../services/groqService");

const getRecommendedProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const projects = await Project.find();

    const recommendations = projects
      .map((project) => {
        const userSkills = user.skills.map((skill) =>
          skill.toLowerCase().trim(),
        );

        const matchedSkills = project.skills.filter((skill) =>
          userSkills.includes(skill.toLowerCase().trim()),
        );

        const score = Math.round(
          (matchedSkills.length / project.skills.length) * 100,
        );

        return {
          ...project.toObject(),
          match: score,
        };
      })
      .filter((project) => project.match > 0)
      .sort((a, b) => b.match - a.match);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAIRecommendedProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let result = await generateProjectRecommendations(user);

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

    const projects = JSON.parse(result);

    res.json(projects);
  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendedProjects,
  getAIRecommendedProjects,
  getProjectById,
  getAllProjects,
};
