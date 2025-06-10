import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import DashboardProgress from "../Dashboard/LessonPage/DashboardProgress";
import ResumeLearning from "./ResumeLearning";
import LearningOptions from "./LearningOptions";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="dashboard-container">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <div className="dashboard-main">
        <h2 className="greetings">Welcome back, Clinton!</h2>

        <div className="content-box">
          <DashboardProgress />
          <ResumeLearning />
          <LearningOptions />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
