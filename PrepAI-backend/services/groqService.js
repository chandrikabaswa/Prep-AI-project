require("dotenv").config();
const axios = require("axios");

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
    model: "openai/gpt-oss-20b",
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
    model: "openai/gpt-oss-20b",
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

async function generateProjectRecommendations(user) {
  const prompt = `
You are an experienced software mentor.

Generate exactly 6 software project recommendations based on the student's profile.

Student Profile

Branch:
${user.branch}

Skills:
${(user.skills || []).join(", ")}

Career Goal:
${user.goal}

Instructions:

1. Recommend projects suitable for the student's skill level.
2. Recommend projects that improve placement opportunities.
3. Prefer trending technologies used in the software industry.
4. Recommend portfolio-worthy projects.
5. Include projects frequently discussed in technical interviews.
6. Recommend modern tech stacks.
7. Explain why each project is recommended.
8. Return ONLY valid JSON.

Example:

[
  {
    "title":"AI Resume Analyzer",
    "description":"Analyze resumes and suggest improvements using AI.",
    "difficulty":"Intermediate",
    "reason":"Recommended because it strengthens your React, backend development and AI integration skills while being an excellent portfolio project.",
    "skills":["React","Node.js","AI"],
    "techStack":["React","Express","MongoDB","Groq AI"]
  }
]
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 6000,
  });

  console.log("AI PROJECT RAW RESPONSE:");
  console.log(response.choices[0].message.content);

  return response.choices[0].message.content;
}

async function generateLearningRecommendations(user) {
  const prompt = `
You are an expert software mentor.

Generate a personalized learning roadmap for the student.

Student Profile

Branch:
${user.branch}

Skills:
${(user.skills || []).join(", ")}

Career Goal:
${user.goal}

Instructions:

Return each topic with:
1. Recommend topics in a logical learning order.
2. Focus on technologies currently in demand.
3. Include interview preparation topics.
4. Recommend topics that strengthen the student's portfolio.
5. Explain why each topic is recommended.
6. Return ONLY valid JSON.

Example:

[
  {
    "title": "React Hooks",
    "description": "Learn useState and useEffect.",
    "difficulty": "Intermediate",
    "duration": "2 Weeks",
    "reason": "Recommended because React Hooks are essential for modern React development and are widely used in frontend interviews.",
    "resources": [
      {
        "name": "React Docs",
        "url": "https://react.dev"
      }
    ]
  }
]
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 6000,
  });

  return response.choices[0].message.content;
}

async function analyzeResume(resumeText) {
  const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Resume:

${resumeText}

Instructions:

1. Give an ATS score out of 100.
2. Write a short overall summary.
3. List 4 strengths.
4. List 4 weaknesses.
5. List important missing skills.
6. Give 5 suggestions for improvement.

Return ONLY valid JSON.

Example:

{
  "atsScore": 84,
  "summary": "The resume is well structured with relevant technical projects but lacks measurable achievements.",
  "strengths": [
    "Good project experience",
    "Strong React skills",
    "Clean formatting",
    "Relevant technical stack"
  ],
  "weaknesses": [
    "Projects lack quantifiable impact",
    "Few action verbs",
    "No deployment links",
    "Limited soft skills"
  ],
  "missingSkills": [
    "Docker",
    "CI/CD",
    "Unit Testing"
  ],
  "improvements": [
    "Add measurable achievements.",
    "Include deployment links.",
    "Mention leadership experience.",
    "Use stronger action verbs.",
    "Tailor the resume for each job."
  ]
}
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
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
  generateProjectRecommendations,
  generateLearningRecommendations,
  analyzeResume,
};
