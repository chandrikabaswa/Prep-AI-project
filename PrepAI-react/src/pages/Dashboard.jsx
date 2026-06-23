import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CareerCard from "../components/CareerCard";
import SkillsCard from "../components/SkillsCard";
import ProjectCard from "../components/ProjectCard";
import LearningCard from "../components/LearningCard";

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    goal: "",
    skills: [],
  });

  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [learningRecommendations, setLearningRecommendations] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const profileRes = await api.get("/users/profile");
        const projectsRes = await api.get("/projects/recommended");
        const learningRes = await api.get("/learning/recommended");

        console.log("Learning:", learningRes.data);

        setUser(profileRes.data);
        setRecommendedProjects(projectsRes.data);
        setLearningRecommendations(learningRes.data);

        localStorage.setItem("user", JSON.stringify(profileRes.data));
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  const skills = user.skills || [];
  const readiness = Math.min(skills.length * 20, 100);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar user={user} />

        <div className="welcome">
          <h1>Welcome {user.name} 👋</h1>
          <p>Your AI mentor will guide your career journey.</p>
        </div>

        <div className="grid">
          <CareerCard goal={user.goal || "Not Set"} readiness={readiness} />

          <SkillsCard skills={skills} />
        </div>

        <div className="recommendations">
          {/* Projects */}
          <div className="card">
            <h3>Recommended Projects</h3>

            <div className="project-container">
              {recommendedProjects.length > 0 ? (
                recommendedProjects.slice(0, 3).map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              ) : (
                <p>No recommended projects found.</p>
              )}
            </div>
          </div>

          {/* Learning */}
          <div className="card">
            <div className="section-header">
              <h3>Learning Recommendations</h3>

              <Link to="/learning" className="view-all">
                View All
              </Link>
            </div>

            {learningRecommendations.length > 0 ? (
              learningRecommendations
                .slice(0, 2)
                .map((item) => <LearningCard key={item._id} item={item} />)
            ) : (
              <p>No learning recommendations available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
