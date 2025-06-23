import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LessonCompletedScreen.css";

const LessonCompleteScreen = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="lesson-complete" data-aos="zoom-in">
      <Confetti width={width} height={height} />
      <h2 data-aos="fade-up">🎉 Lesson {lessonId} Completed!</h2>
      <p data-aos="fade-up" data-aos-delay="200">
        You've successfully completed Lesson {lessonId} in{" "}
        <strong>{language}</strong>.
      </p>

      <div className="button-group" data-aos="fade-up" data-aos-delay="400">
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default LessonCompleteScreen;
