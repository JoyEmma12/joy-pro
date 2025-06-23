import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ProgressMain.css";

const ProgressMain = () => {
  const navigate = useNavigate();
  const languages = Object.keys(lessons);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="main-progress" data-aos="fade-up">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2 data-aos="fade-up" data-aos-delay="100">
        Your Language Progress Overview
      </h2>
      <div className="language-buttons">
        {languages.map((lang, index) => (
          <button
            key={lang}
            onClick={() => navigate(`/progress/${lang}`)}
            className="lang-btn"
            data-aos="fade-up"
            data-aos-delay={150 + index * 100}>
            View {lang} Progress
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressMain;
