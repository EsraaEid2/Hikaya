import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";
const Header = () => {
  return (
    <>
      <nav class="navbar">
        <div class="nav-brand">
          <div class="logo">
            <span class="logo-text">Hikaya</span>
            <div class="logo-shine"></div>
          </div>
        </div>

        <div class="nav-links">
          <a href="#" class="nav-link active">
            <span>Home</span>
            <div class="link-effect"></div>
          </a>
          <a href="#" class="nav-link">
            <span>Products</span>
            <div class="link-effect"></div>
          </a>
          <a href="#" class="nav-link">
            <span>Services</span>
            <div class="link-effect"></div>
          </a>
          <a href="#" class="nav-link">
            <span>About</span>
            <div class="link-effect"></div>
          </a>
          <a href="#" class="nav-link">
            <span>Contact</span>
            <div class="link-effect"></div>
          </a>
        </div>

        <div class="nav-actions">
          <button class="action-btn">
            <div class="btn-text">Sign In</div>
            <div class="btn-effect"></div>
          </button>
        </div>

        <button class="mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div class="mobile-menu">
        <div class="menu-header">
          <div class="logo">
            <span class="logo-text">Premium</span>
          </div>
          <button class="close-menu">
            <span class="close-icon"></span>
          </button>
        </div>
        <div class="menu-links">
          <a href="#" class="menu-link active">
            <span>Home</span>
          </a>
          <a href="#" class="menu-link">
            <span>Products</span>
          </a>
          <a href="#" class="menu-link">
            <span>Services</span>
          </a>
          <a href="#" class="menu-link">
            <span>About</span>
          </a>
          <a href="#" class="menu-link">
            <span>Contact</span>
          </a>
        </div>
        <div class="menu-footer">
          <button class="mobile-action-btn">
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
