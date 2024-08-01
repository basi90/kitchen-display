import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ currentPage, totalPages }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar">
      <div className="left-section">
        <div className="logo">Logo</div>
        <div className="time-pages">
          <div className="time">{currentTime}</div>
          <div className="page-info">Page {currentPage} of {totalPages}</div>
        </div>
      </div>
      <div className="navbar-title">Kitchen Display</div>
      <div className="buttons">
        <button className="btn prioritize">Prioritize</button>
        <button className="btn zoom">Zoom</button>
        <button className="btn other-actions">Other Actions</button>
      </div>
    </div>
  );
}

export default Navbar;
