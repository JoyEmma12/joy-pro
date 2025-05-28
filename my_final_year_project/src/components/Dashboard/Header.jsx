import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ collapsed, setCollapsed }) => {
  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-dark d-md-none"
          onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
        <h4 className="m-0">Language Learning Dashboard</h4>
      </div>
    </div>
  );
};

export default Header;
