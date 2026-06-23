const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      required: true,
    },

    stipend: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    applyLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);