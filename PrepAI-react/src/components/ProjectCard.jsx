import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const difficultyColor = {
    Beginner: "#22c55e",
    Intermediate: "#f59e0b",
    Advanced: "#ef4444",
  };

  return (
    <div className="project-card">
      <div className="card-top">
        <span
          className="difficulty"
          style={{
            background: difficultyColor[project.difficulty],
          }}
        >
          {project.difficulty}
        </span>

        {project.match && <span className="match">⭐ {project.match}%</span>}
      </div>

      {project.reason && <span className="ai-badge">🤖 AI Recommended</span>}

      <h3>{project.title}</h3>

      <p>{project.description}</p>

      {/* AI Recommendation Reason */}

      {project.reason && (
        <div className="ai-reason">
          <h4>⭐ Why this project?</h4>

          <p>{project.reason}</p>
        </div>
      )}

      <div className="chips">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {project._id && (
        <button
          className="view-btn"
          onClick={() => navigate(`/projects/${project._id}`)}
        >
          View Details →
        </button>
      )}
    </div>
  );
}
