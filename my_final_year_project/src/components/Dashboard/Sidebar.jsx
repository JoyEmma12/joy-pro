import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaBook, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav>
        <Link to="/" className="sidebar-link">
          <FaHome /> {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/lessons" className="sidebar-link">
          <FaBook /> {!collapsed && <span>Lessons</span>}
        </Link>
        <Link to="/settings" className="sidebar-link">
          <FaCog /> {!collapsed && <span>Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
