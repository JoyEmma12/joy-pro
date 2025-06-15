import React from "react";
import { useNavigate } from "react-router-dom";
// import { Languages } from "../signup/Languages";
import { quizData } from "./quizdata";
import "./QuizLanguageSelection.css";

const QuizLanguageSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-selector">
      <h2>Select a Quiz</h2>
      <div className="quiz-grid">
        {Object.keys(quizData).map((lang) => (
          <div
            key={lang}
            className="quiz-card"
            onClick={() => navigate(`/quiz/${lang}`)}>
            <h3>{lang.toUpperCase()} Quiz</h3>
            <p>{quizData[lang].length} questions</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizLanguageSelection;
