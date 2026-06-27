import "./ViewProfile.css";

import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function ViewProfile() {
  const initialUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(initialUser);
  const [newSkill, setNewSkill] = useState("");
  const [goal, setGoal] = useState(user.goal || "");
  const [bio, setBio] = useState(user.bio || "");

  const addSkill = async () => {
    if (!newSkill.trim()) return;

    const updatedSkills = [...(user.skills || []), newSkill.trim()];

    try {
      const res = await api.put("/users/profile", {
        college: user.college,
        degree: user.degree,
        branch: user.branch,
        year: user.year,
        skills: updatedSkills,
        goal: user.goal,
        bio: user.bio,
      });

      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setNewSkill("");
    } catch (err) {
      console.error(err);
      alert("Failed to add skill");
    }
  };

  const updateGoal = async () => {
    try {
      const res = await api.put("/users/profile", {
        college: user.college,
        degree: user.degree,
        branch: user.branch,
        year: user.year,
        skills: user.skills,
        goal,
        bio: user.bio,
      });

      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Goal updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update goal.");
    }
  };

  const saveBio = async () => {
    try {
      const res = await api.put("/users/profile", {
        college: user.college,
        degree: user.degree,
        branch: user.branch,
        year: user.year,
        skills: user.skills,
        goal: user.goal,
        bio,
      });

      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Bio updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update bio.");
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar user={user} />

        <h1 className="title">Student Profile</h1>

        <p className="subtitle">
          Manage your skills, concepts learned, and career goals.
        </p>

        <div className="grid">
          {/* PROFILE CARD */}

          <div className="card profile-card">
            <div className="avatar-large">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>

            <h3>{user.name}</h3>

            <p>{user.branch}</p>
          </div>

          {/* SKILLS */}

          <div className="card">
            <h3>Skills & Technologies</h3>

            <p className="card-sub">
              Add tools and languages you are comfortable using.
            </p>

            <div className="tags">
              {(user.skills || []).map((skill) => (
                <div key={skill} className="tag">
                  {skill}
                </div>
              ))}
            </div>

            <div className="input-row">
              <input
                placeholder="E.g. React, Python, Docker..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />

              <button onClick={addSkill}>+ Add</button>
            </div>
          </div>

          {/* CHANGE GOAL */}

          <div className="card">
            <h3>Change Goal</h3>

            <p className="card-sub">Update your career goal.</p>

            <input
              placeholder="Enter your career goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button className="primary-btn" onClick={updateGoal}>
              Update Goal
            </button>

            <p className="current-goal">
              Current Goal: {user.goal || "Not Set"}
            </p>
          </div>

          {/* CONCEPTS */}

          <div className="card">
            <h3>Concepts Learned</h3>

            <p className="card-sub">
              Theoretical knowledge and concepts you understand.
            </p>

            <div className="tags">
              {(user.concepts || []).map((concept) => (
                <div key={concept} className="tag">
                  {concept}
                </div>
              ))}
            </div>

            <div className="input-row">
              <input placeholder="E.g. System Design" />

              <button>+ Add</button>
            </div>
          </div>

          {/* BIO */}

          <div className="card bio-card">
            <h3>Bio / About Me</h3>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />

            <button className="primary-btn" onClick={saveBio}>
              Save Bio
            </button>
          </div>
        </div>

        <div className="save-profile">
          <button className="save-btn">Save Profile</button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
