import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "./LessonCompleteScreen.css";

const LessonCompleteScreen = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="lesson-complete">
      <h2>🎉 Lesson {lessonId} Completed!</h2>
      <p>
        You've successfully completed Lesson {lessonId} in {language}.
      </p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default LessonCompleteScreen;
