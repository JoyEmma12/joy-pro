import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningOptions.css";
import { Languages } from "../signup/Languages";

const LearningOptions = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("selectedLanguage");
    setSelectedLang(stored || "Igbo"); // fallback to Igbo
  }, []);

  const handleLanguageSelection = (language) => {
    localStorage.setItem("selectedLanguage", language);
    setSelectedLang(language);
    navigate(`/lesson/${language}`);
  };

  const languageFlags = {
    Igbo: "🟢",
    Yoruba: "🟣",
    Hausa: "🟤",
    Efik: "🔴",
    Ibibio: "🔵",
  };

  return (
    <div className="LearningOptions-container">
      <h3>Choose a Language to Learn</h3>
      <div className="options-container">
        {Languages.map(({ id, language, text, image }) => {
          const isActive =
            selectedLang.toLowerCase() === language.toLowerCase();

          return (
            <div
              key={id}
              className={`lang-container ${isActive ? "active-lang" : ""}`}>
              <div className="lang-header">
                <span className="flag">{languageFlags[language] || "🌍"}</span>
                <h4>{language}</h4>
              </div>
              <p>{text}</p>
              <button
                className="startLearning-btn"
                onClick={() => handleLanguageSelection(language)}>
                {isActive ? "Continue Learning" : "Start Learning"}
              </button>
              <img src={image} alt={language} className="lang-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningOptions;
