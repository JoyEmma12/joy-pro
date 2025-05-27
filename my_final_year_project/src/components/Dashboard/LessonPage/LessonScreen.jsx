import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";

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
    <div className="lesson-list">
      <h2>Learning {language}</h2>
      <ul>
        {Object.keys(userLessons)
          .map(Number)
          .sort((a, b) => a - b)
          .map((lessonId) => (
            <li key={lessonId}>
              Lesson {lessonId}
              <button
                disabled={!isLessonUnlocked(lessonId)}
                onClick={() => navigate(`/lessons/${language}/${lessonId}`)}>
                {isLessonUnlocked(lessonId) ? "Start Learning" : "Locked"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LessonScreen;
