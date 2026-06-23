const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractResumeText(file) {
  if (!file) return "";

  if (file.mimetype === "application/pdf") {
    const data = await pdf(file.buffer);
    return data.text;
  }

  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.originalname.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return result.value;
  }

  throw new Error("Only PDF and DOCX resumes are supported.");
}

module.exports = {
  extractResumeText,
};