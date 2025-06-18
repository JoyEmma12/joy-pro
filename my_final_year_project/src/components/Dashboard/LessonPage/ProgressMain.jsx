import React from "react";
import { useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./ProgressMain.css";

const ProgressMain = () => {
  const navigate = useNavigate();
  const languages = Object.keys(lessons);

  return (
    <div className="main-progress">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2>Your Language Progress Overview</h2>
      <div className="language-buttons">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => navigate(`/progress/${lang}`)}
            className="lang-btn">
            View {lang} Progress
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressMain;
