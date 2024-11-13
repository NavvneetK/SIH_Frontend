import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import navi from '../assets/Logo.png';

const Navbar = () => {
  // State to handle the visibility of the login options
  const [showOptions, setShowOptions] = useState(false);
  // State to handle the login dialog box
  const [loginDialog, setLoginDialog] = useState({ open: false, role: '' });

  // Toggle the login options dropdown
  const handleGetStartedClick = () => {
    setShowOptions(!showOptions);
  };

  // Open the login dialog box based on role
  const handleLoginClick = (role) => {
    setLoginDialog({ open: true, role });
    setShowOptions(false);
  };

  // Close the login dialog box
  const closeDialog = () => {
    setLoginDialog({ open: false, role: '' });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={navi} alt="NIT Kurukshetra Logo" className='nit-logo' />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/engagement">Engagement</Link></li>
        <li><Link to="/performance">Performance</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/monitor">Monitoring</Link></li>
      </ul>
      <div className="get-started-container">
        <button className="get-started-btn" onClick={handleGetStartedClick}>Get Started</button>
        {showOptions && (
          <div className="login-options">
            <button onClick={() => handleLoginClick('student')}>Login as Student</button>
            <button onClick={() => handleLoginClick('teacher')}>Login as Teacher</button>
            <button onClick={() => handleLoginClick('admin')}>Login as Admin</button>
          </div>
        )}
      </div>

      {/* Conditional rendering for login dialog box */}
      {loginDialog.open && (
        <div className="login-dialog">
          <div className="dialog-content">
            <h2>{`Login as ${loginDialog.role}`}</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="login-btn">Login</button>
            <button className="close-btn" onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
