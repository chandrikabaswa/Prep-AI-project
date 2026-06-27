import { useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "./ResumeAnalyzer.css";

export default function ResumeAnalyzer() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async () => {
    if (!resume) {
      return alert("Please upload a resume.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);

      const res = await api.post("/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      alert("Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar user={user} />

        <h1>AI Resume Analyzer</h1>

        <p className="subtitle">
          Upload your resume and receive AI-powered ATS feedback.
        </p>

        <div className="resume-card">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          {resume && <p className="file-name">📎 {resume.name}</p>}

          <button
            className="analyze-btn"
            onClick={analyzeResume}
            disabled={loading}
          >
            {loading
              ? "🤖 AI is analyzing your resume..."
              : "📄 Analyze Resume"}
          </button>
        </div>

        {analysis && (
          <div className="analysis-card">
            <div className="score-card">
              <h3>ATS SCORE</h3>

              <div className="score-circle">{analysis.atsScore}</div>

              <p>
                {analysis.atsScore >= 80
                  ? "🟢 Excellent"
                  : analysis.atsScore >= 60
                    ? "🟡 Good"
                    : "🔴 Needs Improvement"}
              </p>
            </div>

            <div className="section">
              <h3>📝 Summary</h3>
              <p>{analysis.summary}</p>
            </div>

            <div className="section">
              <h3>✅ Strengths</h3>

              <ul>
                {analysis.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>⚠ Weaknesses</h3>

              <ul>
                {analysis.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>❌ Missing Skills</h3>

              <ul>
                {analysis.missingSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>💡 AI Suggestions</h3>

              <ul>
                {analysis.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
