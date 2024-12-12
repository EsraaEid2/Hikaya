import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../components/MainPage/MainPage.css";
import Search from "../components/landing_page/SearchComponent";
import WriteStory from "../components/story_components/writeStory";

function MainPage() {
  const navigate = useNavigate();
  const [isExploreClicked, setIsExploreClicked] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to write a story.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
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
          <p>Discover and share stories that inspire, educate, and connect!</p>
          <button className="submitButton" onClick={handleLoginClick}>
            Start Sharing
          </button>
          <button id="submitExpButton" onClick={handleExploreClick}>
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
