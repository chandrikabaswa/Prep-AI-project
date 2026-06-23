const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    roadmap: {
      type: [String],
      default: [],
    },

    githubLink: {
      type: String,
      default: "",
    },

    youtubeLink: {
      type: String,
      default: "",
    },

    estimatedTime: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
