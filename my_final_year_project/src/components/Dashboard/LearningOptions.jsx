import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LearningOptions.css";
import { Languages } from "../signup/Languages";
import AOS from "aos";
import "aos/dist/aos.css";

const LearningOptions = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const stored = localStorage.getItem("selectedLanguage");
    setSelectedLang(stored || "Igbo");
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
    <div className="container LearningOptions-container">
      <h3 className="text-center">Choose a Language to Learn</h3>
      <div className="row justify-content-center g-4">
        {Languages.map(({ id, language, text, image }, index) => {
          const isActive =
            selectedLang.toLowerCase() === language.toLowerCase();

          return (
            <div
              key={id}
              className="col-12 col-sm-6 col-md-4 col-lg-4"
              data-aos="zoom-in"
              data-aos-delay={index * 100}>
              <div
                className={`lang-container ${isActive ? "active-lang" : ""}`}>
                <div className="lang-header">
                  <span className="flag">
                    {languageFlags[language] || "🌍"}
                  </span>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningOptions;
