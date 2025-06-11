import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./LessonPreviewScreen.css";

const LessonPreviewScreen = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const parsedLessonId = parseInt(lessonId, 10);

  const lessonContent = lessons[language]?.[parsedLessonId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setShowPopup(false);

    // Toast Notification
    const toast = document.createElement("div");
    toast.textContent = `🎉 Welcome to Lesson ${parsedLessonId}`;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.background = "#4caf50";
    toast.style.color = "white";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = 9999;
    toast.style.fontWeight = "bold";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }, [language, parsedLessonId]);

  const handleNext = async () => {
    if (currentIndex < lessonContent.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user?.username;

      if (username) {
        try {
          const res = await fetch("http://127.0.0.1:5000/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              language,
              lesson: `lesson${parsedLessonId}`,
              status: "completed",
            }),
          });

          const result = await res.json();
          console.log("Progress saved:", result);
        } catch (err) {
          console.error("Error saving progress:", err);
        }
      }

      setShowPopup(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNextLesson = () => {
    setShowPopup(false);
    const lessonKeys = Object.keys(lessons[language])
      .map(Number)
      .sort((a, b) => a - b);
    const nextIndex = lessonKeys.indexOf(parsedLessonId) + 1;

    if (nextIndex < lessonKeys.length) {
      const nextLessonId = lessonKeys[nextIndex];
      navigate(`/lessons/${language}/${nextLessonId}`);
    } else {
      navigate(`/lessons/${language}/${parsedLessonId}/completed`);
    }
  };

  const currentWord = lessonContent[currentIndex];

  return (
    <div className="lesson-preview">
      <h2>{currentWord?.word}</h2>
      <p>{currentWord?.translation}</p>

      {currentWord?.audio && (
        <audio key={`${language}-${currentWord.audio}`} controls>
          <source
            src={`/audio/${language}/${currentWord.audio}`}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext}>
          {currentIndex < lessonContent.length - 1 ? "Next" : "Finish Lesson"}
        </button>
      </div>

      <div className="lesson-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>🎉 Lesson Completed!</h3>
            <p>Would you like to continue with the next lesson?</p>
            <button onClick={goToNextLesson}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPreviewScreen;
