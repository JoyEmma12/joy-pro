import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quizData } from "./quizdata";
import "./QuizScreen.css";

const QuizScreen = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const questions = quizData[language] || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-wrapper">
      <h2 className="quiz-title">📝 {language} Quiz</h2>

      {showResult ? (
        <div className="result-card">
          <h3 className="score">
            Your Score: {score} / {questions.length}
          </h3>
          <div className="quiz-actions">
            <button className="quiz-btn" onClick={handleRetry}>
              Retry
            </button>
            <button className="quiz-btn" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <h4>{questions[current].question}</h4>
          <div className="options-grid">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="option-btn">
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-nav">
            <span>
              Question {current + 1} of {questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
