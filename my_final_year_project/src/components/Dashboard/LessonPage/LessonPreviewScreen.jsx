import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "./LanguageLessons";
import "./LessonPreviewScreen.css";
// import {speak} from "../../../utils/tts"

const LessonPreviewScreen = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const parsedLessonId = parseInt(lessonId, 10);
 //lessonid is already a string, so no need to parse it
  const lessonContent = lessons[language]?.[parsedLessonId] || []; //gets language lessons from languagelesson file
  const [currentIndex, setCurrentIndex] = useState(0); //sets current index of the lesson to 0
  const [showPopup, setShowPopup] = useState(false);


  // lesson popup block of code
  useEffect(() => {
    setCurrentIndex(0);
    setShowPopup(false);

    //TOAST NOTIFICATION
    const toast = document.createElement("div");
    toast.textContent = `🎉 Welcome to Lesson ${parsedLessonId}`;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.background = "#4caf50";
    toast.style.color = "white";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = 9999;
    toast.style.fontWeight = "bold";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }, [language, parsedLessonId]);

  // const speak = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-US";
  //   window.speechSynthesis.speak(utterance);
  // };

  // const handleNext = () => {
  //   if (currentIndex < lessonContent.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   } else {
  //     const progress = JSON.parse(localStorage.getItem("lessonProgress")) || {};
  //     progress[language] = {
  //       ...(progress[language] || {}),
  //       [`lesson${parsedLessonId}`]: "completed",
  //     };
  //     localStorage.setItem("lessonProgress", JSON.stringify(progress));
  //     setShowPopup(true);
  //   }
  // };


  // handlenext btn function block of code
  const handleNext = async () => {
    if (currentIndex < lessonContent.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
      const username = user ? user.username : null;

      console.log("Retrieved user:", user);
      console.log("Username for progress:", username);

      console.log("Finishing lesson for user:", username);
      if (username) {
        try {
          const res = await fetch("http://127.0.0.1:5000/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              language,
              lesson: `lesson${parsedLessonId}`,
              status: "completed",
            }),
          });

          const result = await res.json();
          console.log("Progress saved:", result);
        } catch (err) {
          console.error("Error saving progress:", err);
        }
      }

      setShowPopup(true);
    }
  };

  // handlePrev btn function block of code
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // go to next lesson function block of code
  const goToNextLesson = () => {
    // const nextLesson = parsedLessonId + 1;
    setShowPopup(false);
    const lessonKeys = Object.keys(lessons[language])
      .map(Number)
      .sort((a, b) => a - b);
    const nextIndex = lessonKeys.indexOf(parsedLessonId) + 1;

    if (nextIndex < lessonKeys.length) {
      const nextLessonId = lessonKeys[nextIndex];
      navigate(`/lessons/${language}/${nextLessonId}`);
    } else {
      navigate(`/lessons/${language}/${parsedLessonId}/completed`);
    }

  };

  const currentWord = lessonContent[currentIndex]; // Get the current word based on the current index

  return (
    <div className="lesson-preview">
      <h2>{currentWord?.word}</h2>
      <p>{currentWord?.translation}</p>

      {/* for audio tts */}
      {currentWord?.audio && (
        <audio key={`${language}-${currentWord.audio}`} controls>
          <source
            src={`/audio/${language}/${currentWord.audio}`}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext}>
          {currentIndex < lessonContent.length - 1 ? "Next" : "Finish Lesson"}
        </button>
      </div>
      {/* popup display jsx */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>🎉 Lesson Completed!</h3>
            <p>Would you like to continue with the next lesson?</p>
            <button onClick={goToNextLesson}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPreviewScreen;
