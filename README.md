# 🚀 PrepAI – AI-Powered Career Preparation Platform

PrepAI is a full-stack AI-powered career preparation platform that helps students enhance their technical skills, prepare for interviews, improve their resumes, and discover personalized learning resources. The platform leverages Generative AI to provide intelligent recommendations and feedback based on each student's profile.

---

## ✨ Features

### 👤 User Authentication
- Secure user registration and login using JWT Authentication
- Personalized student profiles

### 📊 Personalized Dashboard
- Displays profile information and career progress
- Personalized recommendations based on user profile

### 🤖 AI Project Recommendations
- Generates personalized software project ideas using Groq AI
- Recommendations based on:
  - Skills
  - Career Goal
  - Academic Branch
- AI explains why each project is recommended

### 📚 AI Learning Roadmap
- Generates personalized learning recommendations
- Suggests technologies and topics based on user profile
- Includes AI-generated explanations for each recommendation

### 🎤 AI Mock Interview
- Generates interview questions based on:
  - Resume
  - Job Role
  - Job Description
- Supports:
  - Resume-aware interview questions
  - Speech-to-Text answers
  - Text-to-Speech question narration
  - AI evaluation and feedback
  - Technical knowledge scoring
  - Communication scoring
  - Confidence scoring

### 📄 AI Resume Analyzer
- Upload PDF/DOCX resumes
- AI-powered ATS analysis
- Generates:
  - ATS Score
  - Resume Summary
  - Strengths
  - Weaknesses
  - Missing Skills
  - Improvement Suggestions

### 💼 Internship Recommendations
- Displays internship opportunities relevant to the user's interests

### 👤 Profile Management
- Manage:
  - Skills
  - Career Goal
  - Bio

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI
- Groq API
- Llama 3.3 70B Versatile

### Authentication
- JWT
- bcrypt

### Resume Processing
- Multer
- pdf-parse
- mammoth

---

## 📂 Project Structure

```
PrepAI
│
├── PrepAI-react
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── PrepAI-backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── services
│   └── uploads
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/chandrikabaswa/Prep-AI-project.git
```

### Frontend

```bash
cd PrepAI-react
npm install
npm run dev
```

### Backend

```bash
cd PrepAI-backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside **PrepAI-backend**

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION

JWT_SECRET=YOUR_SECRET_KEY

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## 📸 Screenshots

> Add screenshots here after deployment.

- Dashboard
- AI Project Recommendations
- AI Learning Roadmap
- AI Mock Interview
- AI Resume Analyzer

---

## 🌟 Future Improvements

- AI Resume vs Job Description Matching
- Interview History
- Download Interview Report (PDF)
- Progress Tracking Dashboard
- AI Career Guidance Chatbot

---

## 👩‍💻 Author

**Chandrika Baswa**

GitHub: https://github.com/chandrikabaswa