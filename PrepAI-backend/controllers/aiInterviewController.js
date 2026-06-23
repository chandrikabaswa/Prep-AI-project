const {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
} = require("../services/groqService");
const { extractResumeText } = require("../services/resumeParser");

const generateInterview = async (req, res) => {
  try {
    const { role, description } = req.body;

    if (!role || !description) {
      return res.status(400).json({
        message: "Role and Job Description are required.",
      });
    }

    const resumeText = (await extractResumeText(req.file)).substring(0, 6000);

    let result = await generateInterviewQuestions(
      role,
      description,
      resumeText,
    );

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = result.indexOf("[");
    const end = result.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Gemini did not return a valid JSON array.");
    }

    result = result.substring(start, end + 1);

    const questions = JSON.parse(result);

    res.status(200).json(questions);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const evaluateInterview = async (req, res) => {
  try {
    const { role, answers } = req.body;

    // Keep only answered questions
    const answeredQuestions = answers.filter(
      (item) => item.answer && item.answer.trim() !== "",
    );

    // If user didn't answer anything
    if (answeredQuestions.length === 0) {
      return res.status(200).json({
        overallScore: 0,
        technicalKnowledge: 0,
        communication: 0,
        confidence: 0,
        strengths: [],
        improvements: [
          "No answers were provided.",
          "Complete the interview to receive an evaluation.",
        ],
        feedback:
          "The interview could not be evaluated because no answers were submitted.",
      });
    }

    console.log("========== EVALUATION START ==========");
    console.log("Role:", role);
    console.log("Answered Questions:", answeredQuestions.length);

    // Send only answered questions to the AI
    let result = await evaluateInterviewAnswers(role, answeredQuestions);

    console.log("AI Raw Response:");
    console.log(result);

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = result.indexOf("{");
    const end = result.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("AI did not return valid JSON.");
    }

    result = result.substring(start, end + 1);

    const evaluation = JSON.parse(result);

    res.status(200).json(evaluation);
  } catch (error) {
    console.error("========== EVALUATION ERROR ==========");
    console.error(error.response?.data || error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateInterview,
  evaluateInterview,
};
