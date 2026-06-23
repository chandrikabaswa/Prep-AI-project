require("dotenv").config();

const axios = require("axios");

async function generateInterviewQuestions(role, description) {
  const prompt = `
You are an experienced technical interviewer.

Generate exactly 5 interview questions.

Role:
${role}

Job Description:
${description}

Return ONLY a JSON array.

Format:

[
  {
    "question": "What is React?",
    "difficulty": "Easy"
  },
  {
    "question": "Explain Virtual DOM.",
    "difficulty": "Medium"
  }
]

Do not return markdown.
Do not return \`\`\`json.
Do not return explanations.
Return only the JSON array.
`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY,
      },
    },
  );

  if (!response.data.candidates || response.data.candidates.length === 0) {
    throw new Error("No response received from Gemini.");
  }

  if (
    !response.data.candidates[0].content ||
    !response.data.candidates[0].content.parts ||
    response.data.candidates[0].content.parts.length === 0
  ) {
    throw new Error("Gemini returned an empty response.");
  }

  return response.data.candidates[0].content.parts[0].text;
}

async function evaluateInterviewAnswers(role, answers) {
  const prompt = `
You are a senior technical interviewer.

Evaluate the candidate's interview.

Role:
${role}

Questions and Answers:

${JSON.stringify(answers, null, 2)}

Give:

1. Overall Score (out of 100)
2. Technical Knowledge (out of 10)
3. Communication (out of 10)
4. Confidence (out of 10)
5. Strengths (array)
6. Areas to Improve (array)
7. Final Feedback

Return ONLY valid JSON.

Example:

{
  "overallScore":85,
  "technicalKnowledge":8,
  "communication":9,
  "confidence":8,
  "strengths":[
    "Good React knowledge",
    "Clear explanations"
  ],
  "improvements":[
    "Practice Hooks",
    "Improve DBMS knowledge"
  ],
  "feedback":"Overall good performance."
}
`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY,
      },
    },
  );

  if (!response.data.candidates || response.data.candidates.length === 0) {
    throw new Error("No response received from Gemini.");
  }

  if (
    !response.data.candidates[0].content ||
    !response.data.candidates[0].content.parts ||
    response.data.candidates[0].content.parts.length === 0
  ) {
    throw new Error("Gemini returned an empty response.");
  }

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
};
