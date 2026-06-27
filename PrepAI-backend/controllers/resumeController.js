const { extractResumeText } = require("../services/resumeParser");

const { analyzeResume } = require("../services/groqService");

const analyzeResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume.",
      });
    }

    // Extract resume text
    const resumeText = await extractResumeText(req.file);

    // Limit text sent to AI
    const text = resumeText.substring(0, 6000);

    let result = await analyzeResume(text);

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

    const analysis = JSON.parse(result);

    res.status(200).json(analysis);
  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResumeController,
};