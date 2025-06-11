import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./LessonCompletedScreen.css";

const LessonCompleteScreen = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();


  return (
    <div className="lesson-complete">
      <Confetti width={width} height={height} />
      <h2>🎉 Lesson {lessonId} Completed!</h2>
      <p>
        You've successfully completed Lesson {lessonId} in {language}.
      </p>

      <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>

      </div>
    </div>
  );
};

export default LessonCompleteScreen;
