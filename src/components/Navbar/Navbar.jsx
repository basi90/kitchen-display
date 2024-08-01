import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo_kitchen.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faSearch, faBars, faSliders } from '@fortawesome/free-solid-svg-icons';


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
        <img src={logo} alt="Logo" className="logo" />
        <div className="time-pages">
          <div className="time">{currentTime}</div>
          <div className="page-info">Page {currentPage} of {totalPages}</div>
        </div>
      </div>
      <div className="navbar-title"><FontAwesomeIcon icon={faSliders} />Kitchen 1</div>
      <div className="buttons">
        <button className="btn prioritize"><FontAwesomeIcon icon={faFlag} />Prioritize</button>
        <button className="btn zoom"><FontAwesomeIcon icon={faSearch} />Zoom</button>
        <button className="btn other-actions"><FontAwesomeIcon icon={faBars} />Other Actions</button>
      </div>
    </div>
  );
}

export default Navbar;
