import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./LessonLangScreen.css";
import AOS from "aos";
import "aos/dist/aos.css";

const LessonLangScreen = () => {
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchProgress = async () => {
      if (username) {
        const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
        const data = await res.json();
        setProgress(data);
      }
    };
    fetchProgress();
  }, [username]);

  const flags = {
    Igbo: "🟢",
    Yoruba: "🟣",
    Hausa: "🟤",
    Efik: "🟠",
    Ibibio: "🔵",
  };

  return (
    <div className="lesson-screen-container">
      <button className="back-btn mb-4" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2 className="text-center">📚 All Language Lessons</h2>
      <div className="row mt-4 g-4 justify-content-center container-fluid">
        {Object.keys(lessons).map((language, idx) => {
          const total = Object.keys(lessons[language]).length;
          const completed = progress[language]
            ? Object.values(progress[language]).filter((s) => s === "completed")
                .length
            : 0;
          const percentage = total ? Math.round((completed / total) * 100) : 0;

          return (
            <div
              key={language}
              className="col-12 col-sm-6 col-md-4 col-lg-4"
              data-aos="zoom-in-up"
              data-aos-delay={idx * 100}>
              <div className="language-card">
                <div className="lang-header">
                  <span className="flag">{flags[language] || "🌍"}</span>
                  <h3>{language}</h3>
                </div>
                <p>
                  {completed} of {total} lessons completed
                </p>
                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-filled"
                    style={{ width: `${percentage}%` }}></div>
                </div>
                <button onClick={() => navigate(`/lesson/${language}`)}>
                  View Lessons
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonLangScreen;
