import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./LessonScreen.css";

const LessonScreen = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    const fetchProgress = async () => {
      if (username) {
        const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
        const data = await res.json();
        setProgress(data);
      }
    };
    fetchProgress();
  }, [language, username]);

  const isLessonUnlocked = (lessonId) => {
    const id = parseInt(lessonId);
    return id === 1 || progress[language]?.[`lesson${id - 1}`] === "completed";
  };

  const userLessons = lessons[language] || {};

  return (
    <div className="lesson-screen-container">
      <h2 className="lesson-title">📘 {language} Lessons</h2>

      <div className="lesson-grid">
        {Object.keys(userLessons)
          .map(Number)
          .sort((a, b) => a - b)
          .map((lessonId) => {
            const unlocked = isLessonUnlocked(lessonId);
            const completed =
              progress[language]?.[`lesson${lessonId}`] === "completed";

            return (
              <div
                key={lessonId}
                className={`lesson-card ${unlocked ? "unlocked" : "locked"} ${
                  completed ? "completed" : ""
                }`}>
                <h3>Lesson {lessonId}</h3>
                {completed && <p className="completed-badge">✅ Completed</p>}
                <button
                  disabled={!unlocked}
                  className="lesson-btn"
                  onClick={() => navigate(`/lessons/${language}/${lessonId}`)}>
                  {unlocked ? "Start Learning" : "🔒 Locked"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LessonScreen;
