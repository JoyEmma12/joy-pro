import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./LessonScreen.css";
import AOS from "aos";
import "aos/dist/aos.css";

const LessonScreen = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    AOS.init({ duration: 800 });
    const fetchProgress = async () => {
      if (username) {
        const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
        const data = await res.json();
        setProgress(data);
      }
    };
    fetchProgress();
  }, [language, username]);

  const isUnlocked = (lessonId) => {
    return (
      lessonId === 1 ||
      progress[language]?.[`lesson${lessonId - 1}`] === "completed"
    );
  };

  const getStatus = (lessonId) => {
    const status = progress[language]?.[`lesson${lessonId}`];
    if (status === "completed") return "✅ Completed";
    if (isUnlocked(lessonId)) return "🟡 In Progress";
    return "🔒 Locked";
  };

  const userLessons = lessons[language] || {};

  return (
    <div className="main-lesson-container ">
      <div className="lesson-header d-flex justify-content-between align-items-center flex-wrap mb-4">
        <button className="back-btn mb-2" onClick={() => navigate("/dashboard")}>
          ⬅ Back to Dashboard
        </button>
        <h2 className="lesson-title text-center w-100">📚 Lessons in {language}</h2>
      </div>

      <div className="row g-4 justify-content-center container-fluid">
        {Object.keys(userLessons)
          .map(Number)
          .sort((a, b) => a - b)
          .map((lessonId, index) => {
            const unlocked = isUnlocked(lessonId);
            return (
              <div
                key={lessonId}
                className="col-sm-6 col-md-4 col-lg-3"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`lesson-card ${!unlocked ? "locked" : ""}`}>
                  <h3>Lesson {lessonId}</h3>
                  <p className="status-label">{getStatus(lessonId)}</p>
                  <button
                    disabled={!unlocked}
                    onClick={() => navigate(`/lessons/${language}/${lessonId}`)}
                  >
                    {unlocked ? "Start / Resume" : "Locked"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LessonScreen;
