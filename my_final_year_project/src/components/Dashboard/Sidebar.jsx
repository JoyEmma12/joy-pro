import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaBook, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar-wrapper ${collapsed ? "collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="sidebar">
        <nav className="nav-links">
          <Link to="/" className="sidebar-link">
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </Link>
          <Link to="/lessons" className="sidebar-link">
            <FaBook />
            {!collapsed && <span>Lessons</span>}
          </Link>
          <Link to="/progress" className="sidebar-link">
            <FaCog />
            {!collapsed && <span>Progress</span>}
          </Link>
          <Link to="/settings" className="sidebar-link">
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
