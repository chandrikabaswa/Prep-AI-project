const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const learningSchema = new mongoose.Schema(
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
      enum: ["Beginner", "Intermediate", "Advanced"],
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

    goals: [
      {
        type: String,
      },
    ],

    resources: [resourceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Learning", learningSchema);