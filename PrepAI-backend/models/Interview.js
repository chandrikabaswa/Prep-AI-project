const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    technicalKnowledge: {
      type: Number,
      default: 0,
    },

    communication: {
      type: Number,
      default: 0,
    },

    confidence: {
      type: Number,
      default: 0,
    },

    strengths: [
      {
        type: String,
      },
    ],

    improvements: [
      {
        type: String,
      },
    ],

    feedback: {
      type: String,
    },

    questions: [
      {
        question: {
          type: String,
        },

        answer: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);