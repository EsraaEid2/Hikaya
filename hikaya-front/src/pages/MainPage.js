import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Ensure Swal is imported
import Sidebar from "../components/MainPage/Sidebar";
import RightSidebar from "../components/MainPage/RightSidebar";
import "../components/MainPage/MainPage.css";
import Search from "../components/landing_page/SearchComponent";
import WriteStory from "../components/story_components/writeStory";

function MainPage() {
  const navigate = useNavigate(); // Initialize navigate
  const [isExploreClicked, setIsExploreClicked] = useState(true); // Default to true to show Explore

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to write a story.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login"); // Navigate to login after Swal confirmation
      });
    }
  }, [navigate]);

  const handleExploreClick = () => {
    setIsExploreClicked(true);
  };

  const handleLoginClick = () => {
    setIsExploreClicked(false);
  };

  return (
    <div className="container">
      <div className="row">
        <section id="header" className="jumbotron text-center">
          <h1 className="display-3 logo-text">Hikaya</h1>
          <p className="lead">Discover inspiring stories from people around the world</p>
          <button className="submitButton" onClick={handleLoginClick}>
            Start Sharing
          </button>
          <button className="submitButton" onClick={handleExploreClick}>
            Explore Stories
          </button>
        </section>
        {isExploreClicked ? <Search /> : <WriteStory />}
        {/* Conditional rendering */}
      </div>
    </div>
  );
}

export default MainPage;
