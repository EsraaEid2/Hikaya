import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../pages/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout method from context
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login page after logging out
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  // Dynamically add 'active' class based on the current route
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo">
            {/* Wrap the logo text with a Link to home */}
            <Link to="/" className="logo-text">
              Hikaya
            </Link>
          </div>
        </div>
  
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className={getNavLinkClass("/")}>
            <span>Home</span>
          </Link>
          <Link to="/dashboard" className={getNavLinkClass("/dashboard")}>
            <span>Stories</span>
          </Link>
          <Link to="/write_story" className={getNavLinkClass("/write_story")}>
            <span>Write Story</span>
          </Link>
          <Link to="/aboutus" className={getNavLinkClass("/aboutus")}>
            <span>About Us</span>
          </Link>
          <Link to="/contactus" className={getNavLinkClass("/contactus")}>
            <span>Contact Us</span>
          </Link>
        </div>
  
        {/* Mobile Hamburger Icon */}
        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
  
        {/* Show search bar and profile dropdown if user is logged in, else show login button */}
        <div className="nav-actions">
          {user ? (
            <div className="profile-dropdown">
              <img
                src={user.profile_picture || "/logo.png"}
                alt="Profile"
                className="profile-image"
              />
              <div className="dropdown-content">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="action-btn">
                <div className="btn-text">Sign In</div>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
