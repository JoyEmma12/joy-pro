import { useEffect, useState } from "react";
import { lessons } from "./LessonPage/LanguageLessons";
import { useNavigate } from "react-router-dom";

const ResumeLearning = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const [resumePoint, setResumePoint] = useState(null);
  const [statusMessage, setStatusMessage] = useState(""); // For “all done” or “no progress”

  useEffect(() => {
    const fetchProgress = async () => {
      if (username) {
        const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
        const data = await res.json();
        setProgress(data);

        let found = false;

        for (const lang in lessons) {
          const sortedLessonKeys = Object.keys(lessons[lang]).sort(
            (a, b) => Number(a) - Number(b)
          );

          for (let i = 0; i < sortedLessonKeys.length; i++) {
            const lessonId = sortedLessonKeys[i];
            const status = data[lang]?.[`lesson${lessonId}`];
            if (status !== "completed") {
              setResumePoint({ language: lang, lessonId });
              found = true;
              break;
            }
          }
        }


        if (!found) {

          const hasAnyProgress = Object.keys(data).length > 0;
          setStatusMessage(
            hasAnyProgress
              ? "🎉 You’ve completed all available lessons!"
              : "You haven’t started any lessons yet. Let's get started!"
          );
        }
      }
    };

    fetchProgress();
  }, [username]);

  if (resumePoint) {
    return (
      <div className="resume-container">
        <h3>Resume Learning</h3>
        <button
          className="resume-btn"
          onClick={() =>
            navigate(`/lessons/${resumePoint.language}/${resumePoint.lessonId}`)
          }>
          Continue {resumePoint.language} from Lesson {resumePoint.lessonId}
        </button>
      </div>
    );
  }

  return (
    <div className="resume-container">
      <h3>Resume Learning</h3>
      <p>{statusMessage}</p>
      {!progress || Object.keys(progress).length === 0 ? (
        <button onClick={() => navigate("/language-options")}>
          Start Learning
        </button>
      ) : null}
    </div>
  );
};

export default ResumeLearning;
