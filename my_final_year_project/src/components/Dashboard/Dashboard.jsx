import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Dashboard.css";
import ResumeLearning from "./ResumeLearning";
import LearningOptions from "./LearningOptions";
import QuickActions from "./QuickActions";
import DashboardProgress from "./LessonPage/DashboardProgress";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true); // Sidebar starts hidden

  return (
    <div className="dashboard-container">
      <Sidebar collapsed={collapsed} />
      <div className="dashboard-content">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <h2 className="greetings">Welcome back, Clinton! Keep Learning</h2>
        <DashboardProgress />
        <ResumeLearning />
        <LearningOptions />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
