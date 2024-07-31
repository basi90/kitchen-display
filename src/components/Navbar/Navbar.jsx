import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ currentPage, totalPages }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar">
      <div className="logo">Kitchen Display</div>
      <div className="info">
        <div className="time">{currentTime}</div>
        <div className="page-info">Page {currentPage} of {totalPages}</div>
      </div>
      <div className="buttons">
        <button className="btn prioritize">Prioritize</button>
        <button className="btn zoom">Zoom</button>
        <button className="btn other-actions">Other Actions</button>
      </div>
    </div>
  );
}

export default Navbar;
