import React from "react";
import "./QuickActions.css";
import { IoMdArrowForward } from "react-icons/io";

const QuickActions = () => {
  return (
    <div className="quick-actions-container">
      <h3 className="quick-actions-title">Quick Actions</h3>

      <div className="quick-actions-cards">
        <div className="quick-actions-card">
          <h4>Pick up where you left off and keep learning</h4>
          <button className="quick-actions-btn">
            Resume Learning <IoMdArrowForward />
          </button>
        </div>
        <div className="quick-actions-card">
          <h4>Challenge yourself with a quick quiz</h4>
          <button className="quick-actions-btn">
            Start Quiz <IoMdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
