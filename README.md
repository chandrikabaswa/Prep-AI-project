# 🚀 PrepAI – AI-Powered Career Preparation Platform

PrepAI is an AI-powered career preparation platform that helps students prepare for placements by providing personalized project recommendations, learning resources, internship suggestions, and AI-powered mock interviews.

---

## ✨ Features

### 📚 Personalized Dashboard
- Displays student profile and skills
- Personalized recommendations
- Clean and responsive UI

### 💡 Project Recommendations
- AI-powered project suggestions
- Technology stack recommendations
- Difficulty-based filtering

### 📖 Learning Recommendations
- Curated learning resources
- Skill-based roadmaps
- Recommended courses

### 💼 Internship Recommendations
- Internship listings
- Role-based recommendations
- Easy navigation

### 🤖 AI Mock Interview
- Upload Resume (PDF/DOCX)
- Resume Parsing
- AI-generated interview questions
- Personalized questions based on:
  - Resume
  - Target Role
  - Job Description
- Speech-to-Text answer input
- AI reads questions aloud using Text-to-Speech
- Interview timer
- AI evaluation with detailed feedback

### 📊 Interview Evaluation
- Overall Score
- Technical Knowledge Score
- Communication Score
- Confidence Score
- Strengths
- Areas for Improvement
- Detailed AI Feedback
- Interview Summary

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- React Router
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## AI Integration
- Groq API (Llama 3)

## Other Technologies
- Multer
- pdf-parse
- mammoth
- Web Speech API
  - Speech Recognition
  - Speech Synthesis

---

# 📂 Project Structure

```
PrepAI
│
├── PrepAI-react
│   ├── src
│   ├── public
│   └── package.json
│
├── PrepAI-backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middleware
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/PrepAI.git
```

---

## Frontend Setup

```bash
cd PrepAI-react
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd PrepAI-backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file inside **PrepAI-backend**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

---

# 📸 Screenshots

Add screenshots of:

- Dashboard
- Project Recommendations
- Learning Recommendations
- Internship Page
- AI Mock Interview
- AI Evaluation

---

# 🎯 Future Enhancements

- Interview History
- Download Interview Report (PDF)
- AI Resume Feedback
- Coding Interview Module
- Behavioral Interview Module
- Company-wise Interview Sets
- Performance Analytics Dashboard

---

# 👩‍💻 Author

**Chandrika Baswa**

- GitHub: https://github.com/chandrikabaswa

---

## ⭐ If you like this project, consider giving it a star!
