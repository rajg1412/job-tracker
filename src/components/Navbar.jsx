import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Home, Plus, List, BarChart3 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Briefcase size={28} />
          <span className="logo-text">Job Tracker</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={20} />
            <span className="link-text">Dashboard</span>
          </Link>
          
          <Link to="/add-job" className={`nav-link ${isActive('/add-job')}`}>
            <Plus size={20} />
            <span className="link-text">Add Job</span>
          </Link>
          
          <Link to="/all-jobs" className={`nav-link ${isActive('/all-jobs')}`}>
            <List size={20} />
            <span className="link-text">All Jobs</span>
          </Link>
          
          <Link to="/statistics" className={`nav-link ${isActive('/statistics')}`}>
            <BarChart3 size={20} />
            <span className="link-text">Stats</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;