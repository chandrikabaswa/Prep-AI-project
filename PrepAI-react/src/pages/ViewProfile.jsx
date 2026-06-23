import "./ViewProfile.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function ViewProfile() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar user={user} />

        <h1 className="title">Student Profile</h1>

        <p className="subtitle">
          Manage your skills, concepts learned,
          and career goals.
        </p>

        <div className="grid">

          {/* PROFILE CARD */}

          <div className="card profile-card">
            <div className="avatar-large">
              {user.name
                ? user.name[0].toUpperCase()
                : "U"}
            </div>

            <h3>{user.name}</h3>

            <p>{user.branch}</p>

            <button className="outline-btn">
              Change Avatar
            </button>
          </div>

          {/* SKILLS */}

          <div className="card">
            <h3>Skills & Technologies</h3>

            <p className="card-sub">
              Add tools and languages you are
              comfortable using.
            </p>

            <div className="tags">
              {(user.skills || []).map(
                (skill) => (
                  <div
                    key={skill}
                    className="tag"
                  >
                    {skill}
                  </div>
                )
              )}
            </div>

            <div className="input-row">
              <input placeholder="E.g. React, Python, Docker..." />

              <button>+ Add</button>
            </div>
          </div>

          {/* CHANGE GOAL */}

          <div className="card">
            <h3>Change Goal</h3>

            <p className="card-sub">
              Update your career goal.
            </p>

            <input
              placeholder="Enter your career goal"
              defaultValue={user.goal}
            />

            <button className="primary-btn">
              Update Goal
            </button>

            <p className="current-goal">
              Current Goal:
              {" "}
              {user.goal || "Not Set"}
            </p>
          </div>

          {/* CONCEPTS */}

          <div className="card">
            <h3>Concepts Learned</h3>

            <p className="card-sub">
              Theoretical knowledge and
              concepts you understand.
            </p>

            <div className="tags">
              {(user.concepts || []).map(
                (concept) => (
                  <div
                    key={concept}
                    className="tag"
                  >
                    {concept}
                  </div>
                )
              )}
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
              defaultValue={user.bio}
            />
          </div>

        </div>

        <div className="save-profile">
          <button className="save-btn">
            Save Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewProfile;