import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LearningCard from "../components/LearningCard";

import "./Learning.css";

function Learning() {
  const [user, setUser] = useState({});
  const [topics, setTopics] = useState([]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, learningRes] = await Promise.all([
          api.get("/users/profile"),
          api.get("/learning/recommended"),
        ]);

        setUser(profileRes.data);
        setTopics(learningRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(search.toLowerCase()) ||
        topic.description.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" || topic.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [topics, search, difficulty]);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar user={user} />

        <h1 className="learning-page-title">Learning Roadmap</h1>

        <p className="learning-page-subtitle">
          Personalized learning recommendations based on your skills and career
          goal.
        </p>

        <div className="learning-toolbar">
          <input
            className="learning-search"
            placeholder="Search topics..."
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

        <div className="learning-grid">
          {filteredTopics.map((topic) => (
            <LearningCard key={topic._id} item={topic} fullView={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learning;
