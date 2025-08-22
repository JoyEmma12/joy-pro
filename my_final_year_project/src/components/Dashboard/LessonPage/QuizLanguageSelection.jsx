import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizData } from "./quizdata";
import AOS from "aos";
import "aos/dist/aos.css";
import "./QuizLanguageSelection.css";

const QuizLanguageSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="quiz-selector" data-aos="fade-up">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2 data-aos="fade-up" data-aos-delay="100">
        📘 Select a Quiz
      </h2>
      <div className="quiz-grid" data-aos="fade-up" data-aos-delay="200">
        {Object.keys(quizData).map((lang, index) => (
          <div
            key={lang}
            className="quiz-card"
            data-aos="zoom-in"
            data-aos-delay={300 + index * 100}
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
