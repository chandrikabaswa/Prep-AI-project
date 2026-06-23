import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProfileSetup.css";

function ProfileSetup() {
  const navigate = useNavigate();

  const [college, setCollege] = useState("");

  const [degree, setDegree] = useState("");

  const [branch, setBranch] = useState("");

  const [year, setYear] = useState("1st Year");

  const [skills, setSkills] = useState("");

  const [goal, setGoal] = useState("");

  async function createProfile(e) {
    e.preventDefault();

    try {
      // const token = localStorage.getItem("token");

      const skillsArray = skills
        ? skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];

      const res = await api.put("/users/profile", {
        college,
        degree,
        branch,
        year,
        skills: skillsArray,
        goal,
      });

      // Update localStorage with latest user details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile created successfully");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Build Your Profile</h2>

        <form onSubmit={createProfile}>
          <label>College / University</label>

          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />

          <label>Degree</label>

          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />

          <div className="row">
            <div className="field">
              <label>Branch</label>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Select Branch</option>

                <option>Computer Science</option>

                <option>Information Technology</option>

                <option>Artificial Intelligence</option>

                <option>Data Science</option>
              </select>
            </div>

            <div className="field">
              <label>Year</label>

              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option>1st Year</option>

                <option>2nd Year</option>

                <option>3rd Year</option>

                <option>4th Year</option>
              </select>
            </div>
          </div>

          <label>Skills</label>

          <input
            type="text"
            placeholder="HTML, Python, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label>Career Goal</label>

          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            Create My Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
