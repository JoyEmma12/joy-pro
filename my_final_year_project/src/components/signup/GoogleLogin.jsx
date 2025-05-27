import React from 'react'
import { Link } from 'react-router-dom';
import "./GoogleLogin.css"
import googleImage from "../assets/signup_assets/googleimage.png"


const GoogleLogin = () => {
  return (
    <div className="google-login-container container">
      <h2 className='fw-semibold'>Google Login Clicked</h2>
      <img src={googleImage} className='googleImage' alt="google-login-image" />
      <p className='fw-medium text-white'>This is a placeholder for Google authentication.</p>
      <Link to="/" className="back-btn">
        Go Back
      </Link>
    </div>
  );
}

export default GoogleLogin