import "./InternshipCard.css";

export default function InternshipCard({ internship }) {
  return (
    <div className="internship-card">

      <div className="internship-top">

        <div>
          <h3>{internship.company}</h3>

          <p className="role">
            {internship.title}
          </p>
        </div>

        {internship.match && (
          <span className="match-badge">
            ⭐ {internship.match}%
          </span>
        )}

      </div>

      <div className="internship-meta">
        <span>📍 {internship.location}</span>
        <span>💻 {internship.mode}</span>
        <span>⏳ {internship.duration}</span>
      </div>

      <div className="stipend">
        💰 {internship.stipend}
      </div>

      <div className="skills">
        {internship.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      {internship.missingSkills?.length > 0 && (
        <div className="missing-skills">
          <strong>Missing:</strong>{" "}
          {internship.missingSkills.join(", ")}
        </div>
      )}

      <button
        className="apply-btn"
        onClick={() =>
          window.open(internship.applyLink, "_blank")
        }
      >
        Apply Now →
      </button>

    </div>
  );
}