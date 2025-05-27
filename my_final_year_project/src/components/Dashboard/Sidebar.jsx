import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Custom styles
import { GoHome } from "react-icons/go";
import { FiBookOpen, FiSettings } from "react-icons/fi";
import { ImPencil2 } from "react-icons/im";
import { MdHelpOutline, MdOutlineInsertChartOutlined } from "react-icons/md";
import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineGlobeAsiaAustralia,
} from "react-icons/hi2";

const MySidebar = ({ collapsed }) => {
  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : "active"}`}>
      <Sidebar collapsed={collapsed} className="custom-sidebar">
        <Menu>
          <MenuItem>
            <h2 className="fw-bold bg-dark-subtle">
              {collapsed ? "L" : "Logo"}
            </h2>
          </MenuItem>
          <MenuItem className="menu">
            <Link className="sidebar-link">
              <GoHome className="fs-4" />
              {!collapsed && <span className="m-2">Dashboard</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <HiOutlineGlobeAsiaAustralia className="fs-4" />
              {!collapsed && <span className="m-2">Languages</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <FiBookOpen className="fs-4" />
              {!collapsed && <span className="m-2">Lessons</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <ImPencil2 className="fs-4" />
              {!collapsed && <span className="m-2">Practice and Quizzes</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <MdOutlineInsertChartOutlined className="fs-4" />
              {!collapsed && <span className="m-2">Progress</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <HiOutlineChatBubbleLeftEllipsis className="fs-4" />
              {!collapsed && <span>Community</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <FiSettings className="fs-4" />
              {!collapsed && <span className="m-2">Settings</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="sidebar-link">
              <MdHelpOutline className="fs-4" />
              {!collapsed && <span className="m-2">Help</span>}
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySidebar;
