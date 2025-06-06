import { useEffect, useState } from "react";
import { lessons } from "./LanguageLessons";
import "./DashboardProgress.css";
import { useNavigate } from "react-router-dom";

const DashboardProgress = () => {
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      if (username) {
        try {
          const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
          const data = await res.json();
          setProgress(data);
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      }
    };

    fetchProgress();
  }, [username]);

  return (
    <div className="dashboard-progress-container">
      {Object.keys(lessons).map((language) => {
        const total = Object.keys(lessons[language]).length;
        const completed = progress[language]
          ? Object.values(progress[language]).filter(
              (val) => val === "completed"
            ).length
          : 0;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        return (
          <div className="progress-card" key={language}>
            <h4>{language.toUpperCase()}</h4>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}></div>
              </div>
              <span>{percentage}% Complete</span>
            </div>
            <button onClick={() => navigate(`/progress/${language}`)}>
              View Progress
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardProgress;
