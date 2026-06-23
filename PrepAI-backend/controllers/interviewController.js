const Interview = require("../models/Interview");

const getQuestions = async (req, res) => {
  try {
    const { role, difficulty } = req.query;

    const questions = await Interview.find(
      {
        role,
        difficulty,
      },
      {
        expectedAnswer: 0,
        __v: 0,
      },
    ).limit(5);

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getQuestions,
};
