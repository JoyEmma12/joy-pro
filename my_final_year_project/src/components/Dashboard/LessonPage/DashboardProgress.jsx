import { useEffect, useState } from "react";
import { lessons } from "./LanguageLessons";
import "./DashboardProgress.css";

const DashboardProgress = () => {
  const [progress, setProgress] = useState({});
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    const fetchProgress = async () => {
      if (username) {
        try {
          const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
          const data = await res.json();
          console.log("Fetched progress:", data);
          setProgress(data);
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      }
    };

    fetchProgress();
  }, [username]);


  const totalCompleted = Object.values(progress)
    .flatMap((lang) => Object.values(lang))
    .filter((status) => status === "completed").length;

  return (
    <div className="dashboard-progress">
      <h1>now</h1>
      {Object.keys(lessons).map((language) => {
        const totalLessons = Object.keys(lessons[language]).length;
        const completed = progress[language]
          ? Object.values(progress[language]).filter(
              (val) => val === "completed"
            ).length
          : 0;
        const percentage = totalLessons
          ? Math.round((completed / totalLessons) * 100)
          : 0;

        // Group lessons
        const completedLessons = [];
        const inProgressLessons = [];
        const lockedLessons = [];

        Object.entries(lessons[language])
          .sort(([a], [b]) => Number(a) - Number(b))
          .forEach(([lessonId, lessonData]) => {
            const status = progress[language]?.[`lesson${lessonId}`];

            if (status === "completed") {
              completedLessons.push(lessonId);
            } else if (
              lessonId === "1" ||
              progress[language]?.[`lesson${parseInt(lessonId) - 1}`] ===
                "completed"
            ) {
              inProgressLessons.push(lessonId);
            } else {
              lockedLessons.push(lessonId);
            }
          });

        return (
          <div className="progress-section" key={language}>
            <h3>
              {language} Progress: {percentage}%
            </h3>
            <div className="progress-bar">
              <div
                className="filled-bar"
                style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="lesson-status-group">
              <h4>✅ Completed</h4>
              <ul>
                {completedLessons.map((id) => (
                  <li key={id}>Lesson {id}</li>
                ))}
              </ul>

              <h4>🟡 In Progress</h4>
              <ul>
                {inProgressLessons.map((id) => (
                  <li key={id}>Lesson {id}</li>
                ))}
              </ul>

              <h4>🔒 Locked</h4>
              <ul>
                {lockedLessons.map((id) => (
                  <li key={id}>Lesson {id}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      <h2 className="dashboard-summary">
        📚 Total Lessons Completed: {totalCompleted}
      </h2>
    </div>
  );
};

export default DashboardProgress;
