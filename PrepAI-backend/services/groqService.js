require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateInterviewQuestions(role, description, resumeText) {
  const prompt = `
You are a senior software engineer conducting an interview.

Generate exactly 5 interview questions.

Candidate Resume:
${resumeText || "Resume not provided."}

Target Role:
${role}

Job Description:
${description}

Instructions:

1. Read the resume carefully.
2. Ask questions based on:
   - Resume projects
   - Skills mentioned
   - Technologies used
   - Job description
3. Mix Easy, Medium and Hard questions.
4. If the resume contains projects, ask about those projects.
5. If the resume is empty, generate questions only from the job description.

Return ONLY valid JSON.

Example:

[
  {
    "question": "Explain your Ecommerce project.",
    "difficulty": "Easy"
  },
  {
    "question": "How does React Virtual DOM work?",
    "difficulty": "Medium"
  },
  {
    "question": "Explain JWT Authentication in your project.",
    "difficulty": "Hard"
  }
]
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

async function evaluateInterviewAnswers(role, answers) {
  const prompt = `
You are a senior technical interviewer.

Evaluate the following interview.

Role:
${role}

Questions and Answers:

If a question has no answer, treat it as unanswered.

Do not assume the candidate knows the answer.

Score only based on the answers actually provided.

If all answers are empty, return an overall score of 0.

${JSON.stringify(answers, null, 2)}

Return ONLY JSON.

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
    "Practice DBMS",
    "Improve confidence"
  ],
  "feedback":"Overall good performance."
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  return response.choices[0].message.content;
}

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
};