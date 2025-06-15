import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lessons } from "./LessonPage/LanguageLessons";
import "./ResumeLearning.css";

const ResumeLearning = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [resumePoint, setResumePoint] = useState(null);
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    const fetchProgress = async () => {
      if (username) {
        const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
        const data = await res.json();
        setProgress(data);

        for (const lang in lessons) {
          const keys = Object.keys(lessons[lang]).sort(
            (a, b) => Number(a) - Number(b)
          );
          for (let i = 0; i < keys.length; i++) {
            const lessonId = keys[i];
            const status = data[lang]?.[`lesson${lessonId}`];
            if (status !== "completed") {
              setResumePoint({ language: lang, lessonId });
              return;
            }
          }
        }
      }
    };
    fetchProgress();
  }, [username]);

  return (
    <div className="resume-card">
      <h3>⏯️ Pick Up Where You Left Off</h3>
      {resumePoint ? (
        <>
          <p>
            Continue learning <strong>{resumePoint.language}</strong> from
            Lesson <strong>{resumePoint.lessonId}</strong>
          </p>
          <button
            className="resume-btn"
            onClick={() =>
              navigate(
                `/lessons/${resumePoint.language}/${resumePoint.lessonId}`
              )
            }>
            Resume Lesson
          </button>
        </>
      ) : (
        <p>You’ve completed all lessons or haven’t started yet.</p>
      )}
    </div>
  );
};

export default ResumeLearning;
