import React from "react";
import "./QuickActions.css";
import { IoMdArrowForward } from "react-icons/io";

const QuickActions = () => {
  return (
    <div className="Quickaction-container">
      <h3>Quick Actions</h3>

      <div className="action-container d-flex flex-row flex-lg-row flex-sm-column gap-5">
        <div className="lang-container">
          <h4>Pick up where you left off and keep learning</h4>
          <p></p>
          <button className="startLearning-btn">
            Resume Learning <IoMdArrowForward />
          </button>
        </div>
        <div className="lang-container">
          <h4>Challenge yourself with a quick quiz</h4>
          <p></p>
          <button className="startLearning-btn">
            Start Quiz <IoMdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
