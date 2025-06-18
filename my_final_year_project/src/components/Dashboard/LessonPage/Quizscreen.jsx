import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quizData } from "./quizdata";
import "./QuizScreen.css";

const QuizScreen = () => {
  const { language } = useParams();
  const navigate = useNavigate();

  const langKey = language.toLowerCase();
  const questions = quizData[langKey] || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Reset state on language change (important for Next Quiz)
  useEffect(() => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  }, [language]);

  // Save score to backend
  useEffect(() => {
    if (!showResult) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;

    if (username) {
      fetch("http://127.0.0.1:5000/quiz-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, language: langKey, score }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Quiz score saved:", data))
        .catch((err) => console.error("Error saving quiz score:", err));
    }
  }, [showResult, langKey, score]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  const goToNextQuiz = () => {
    const quizKeys = Object.keys(quizData).map((key) => key.toLowerCase());
    const index = quizKeys.indexOf(langKey);
    const nextLang = quizKeys[index + 1];

    if (nextLang) {
      navigate(`/quiz/${nextLang}`);
    } else {
      navigate("/dashboard");
    }
  };

  const getStars = () => {
    const percent = (score / questions.length) * 100;
    if (percent === 100) return "🌟🌟🌟 Excellent!";
    if (percent >= 60) return "🌟🌟 Good Job!";
    return "🌟 Keep Practicing!";
  };

  if (!questions.length) {
    return (
      <div className="quiz-wrapper">
        <h2>No quiz available for {language}</h2>
        <button className="quiz-btn" onClick={() => navigate("/quiz")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      <h2 className="quiz-title">📝 {language} Quiz</h2>

      {!showResult && (
        <div className="question-card">
          <h4>{questions[current].question}</h4>
          <div className="options-grid">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className="option-btn"
                onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-nav">
            Question {current + 1} of {questions.length}
          </div>
        </div>
      )}

      {showResult && (
        <div className="quiz-overlay">
          <div className="result-card">
            <h3 className="score">
              Your Score: {score} / {questions.length}
            </h3>
            <p className="feedback">{getStars()}</p>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${(score / questions.length) * 100}%` }}></div>
            </div>
            <div className="quiz-actions">
              <button className="quiz-btn" onClick={handleRetry}>
                Retry
              </button>
              <button
                className="quiz-btn"
                onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
              {Object.keys(quizData)
                .map((key) => key.toLowerCase())
                .indexOf(langKey) <
                Object.keys(quizData).length - 1 && (
                <button className="quiz-btn" onClick={goToNextQuiz}>
                  Next Quiz →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default QuizScreen;
