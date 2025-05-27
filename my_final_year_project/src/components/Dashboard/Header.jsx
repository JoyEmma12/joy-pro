import React from "react";
import "./Header.css";
import { PiCaretDownBold } from "react-icons/pi";
import { FaBars } from "react-icons/fa"; // Toggle button icon
import userprofile from "./assets/userprofile.jpg";

const Header = ({ collapsed, setCollapsed }) => {
  return (
    <div className="Header-container d-flex flex-lg-row align-items-center justify-content-between p-2">
      <div className=" d-flex flex-row align-items-center justify-content-between gap-5">
        {/* Toggle button moved here */}
        <button className="toggle-btn m-2" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>

        <div>
          <h2 className="Header-title m-2">Dashboard</h2>
        </div>
      </div>

      <div className="user-profile">
        <img src={userprofile} className="user-img" alt="user-profile" />
        <PiCaretDownBold />
      </div>
    </div>
  );
};

export default Header;
