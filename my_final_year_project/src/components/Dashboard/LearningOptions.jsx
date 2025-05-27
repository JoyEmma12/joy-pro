import React from "react";
import { useNavigate } from "react-router-dom";
import "./LearningOptions.css";
import { Languages } from "../signup/Languages";

const LearningOptions = () => {
  const navigate = useNavigate()

const handleLanguageSelection = (language) => {
  //store selection
  localStorage.setItem("selectedLanguage", language);
    navigate(`/lesson/${language}`);
}

  return (
    <div className="LearningOptions-container">
        <h3>Choose a Language to Learn</h3>

      {/* language options */}
      <div className="options-container d-flex flex-row flex-lg-row flex-sm-column justify-content-between flex-wrap gap-5">
        {Languages.map((options) => {
          const { id, language, text, image } = options;
          return (
            <div key={id} className="lang-container">
              <h4>{language}</h4>
              <p>{text}</p>
              <button className="startLearning-btn" onClick={() => handleLanguageSelection(language)}>Start Learning</button>
              <img src={image} alt="language-images" className="lang-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningOptions;
