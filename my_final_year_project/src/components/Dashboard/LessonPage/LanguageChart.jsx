// components/Progress/LanguageChart.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./LanguageChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

const LanguageChart = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("bar");
  const [progressData, setProgressData] = useState({});

  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`http://127.0.0.1:5000/progress/${username}`);
      const data = await res.json();
      setProgressData(data[language] || {});
    };
    fetchProgress();
  }, [language, username]);

  const lessonLabels = Object.keys(progressData);
  const statusValues = lessonLabels.map((lesson) =>
    progressData[lesson] === "completed" ? 1 : 0
  );

  const chartData = {
    labels: lessonLabels,
    datasets: [
      {
        label: `${language} Progress`,
        data: statusValues,
        backgroundColor: "#7a5af5",
        borderColor: "#4b3df5",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales:
      chartType === "bar" || chartType === "line"
        ? {
            y: {
              beginAtZero: true,
              max: 1,
            },
          }
        : {},
  };

  const ChartComponent =
    chartType === "bar" ? Bar : chartType === "doughnut" ? Doughnut : chartType;

  return (
    <div className="language-chart">
      <button onClick={() => navigate("/progress")} className="back-btn">
        ⬅ Back
      </button>

      <h3>{language} Progress Overview</h3>

      <div className="chart-controls">
        <label>Select Chart Type:</label>
        <select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}>
          <option value="bar">Bar</option>
          <option value="doughnut">Doughnut</option>
        </select>
      </div>

      <ChartComponent data={chartData} options={chartOptions} />
    </div>
  );
};

export default LanguageChart;
