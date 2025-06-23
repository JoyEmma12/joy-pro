import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import "./QuickActions.css";
import AOS from "aos";
import "aos/dist/aos.css";

const QuickActions = () => {
  const navigate = useNavigate();
  const selectedLang = localStorage.getItem("selectedLanguage") || "igbo";

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleResume = () => {
    const progress = JSON.parse(localStorage.getItem("progress")) || {};
    const lessons = Object.keys(progress[selectedLang] || {});
    const incomplete = lessons.find(
      (l) => progress[selectedLang][l] !== "completed"
    );
    const lessonId = incomplete?.replace("lesson", "") || "1";
    navigate(`/lessons/${selectedLang}/${lessonId}`);
  };

  const handleQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="container quick-actions-container">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-5" data-aos="fade-right">
          <div className="quick-actions-card">
            <h4>Pick up where you left off and keep learning</h4>
            <button className="quick-actions-btn" onClick={handleResume}>
              Resume Learning <IoMdArrowForward />
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-5" data-aos="fade-left">
          <div className="quick-actions-card">
            <h4>Challenge yourself with a quick quiz</h4>
            <button className="quick-actions-btn" onClick={handleQuiz}>
              Start Quiz <IoMdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
