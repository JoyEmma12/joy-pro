import { useEffect, useState } from "react";
import { lessons } from "./LanguageLessons";
import "./DashboardProgress.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const DashboardProgress = () => {
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
    <div className="container py-4">
      <div className="row justify-content-center g-4">
        {Object.keys(lessons).map((language, index) => {
          const total = Object.keys(lessons[language]).length;
          const completed = progress[language]
            ? Object.values(progress[language]).filter(
                (val) => val === "completed"
              ).length
            : 0;
          const percentage = total ? Math.round((completed / total) * 100) : 0;

          return (
            <div
              key={language}
              className="col-12 col-sm-10 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="progress-card h-100">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardProgress;
