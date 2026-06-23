import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import "./Projects.css";

import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [user, setUser] = useState({});
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  const [activeTab, setActiveTab] = useState("recommended");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, recommendedRes, allRes] = await Promise.all([
          api.get("/users/profile"),
          api.get("/projects/recommended"),
          api.get("/projects"),
        ]);

        setUser(profileRes.data);
        setRecommendedProjects(recommendedRes.data);
        setAllProjects(allRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const projects =
    activeTab === "recommended" ? recommendedProjects : allProjects;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.skills.some((skill) => skill.toLowerCase().includes(keyword)) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(keyword));

      const matchesDifficulty =
        difficulty === "All" || project.difficulty === difficulty;

      const matchesCategory =
        category === "All" ||
        project.skills.some(
          (skill) => skill.toLowerCase() === category.toLowerCase(),
        );

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [projects, search, difficulty, category]);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="projects-header">
          <div className="header-left">
            <h1>Project Guidance</h1>

            <p>Discover projects that match your skills and interests.</p>
          </div>

          <div className="header-profile">
            <div className="profile-info">
              <h3>{user.name}</h3>

              <span>{user.goal || "Student"}</span>
            </div>

            <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
          </div>
        </div>

        <div className="search-filter">
          <input
            className="search-box"
            placeholder="🔍 Search by project, skill or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="filter-row">
          <div className="tabs">
            <button
              className={activeTab === "recommended" ? "active" : ""}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended
            </button>

            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              Explore All
            </button>
          </div>

          <div className="category-filter">
            {[
              "All",
              "React",
              "Java",
              "Python",
              "Node.js",
              "Machine Learning",
            ].map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category active-category" : "category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.length === 0 ? (
            <div className="empty-state">No matching projects found.</div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
