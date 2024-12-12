import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Use useParams to get user ID from the URL
import axios from "axios"; // To make API calls
import styles from "../components/UserProfile/UserProfile.css";
import ProfileContent from "../components/UserProfile/ProfileContent";
import Hikaya3d from "../components/landing_page/hikaya3d";
const UserProfile = () => {
  const [user, setUser] = useState(null); // State to store the fetched user data
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL parameter

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // Access the user ID
        const userId = user ? user.id : null;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user-profile/${userId}`
        );
        setUser(response.data); // Update state with the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, [id]);

  const handleTabClick = (section) => {
    navigate(`/profile-content?section=${section}`);
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div className="col-md-12">
            <div className={`content content-full-width ${styles.content}`}>
              {/* Profile Header */}
              <div className={`profile ${styles.profile}`}>
                <div className={`profile-header ${styles.profileHeader}`}>
                  {/* Profile Cover */}
                  <div
                    className={`profile-header-cover ${styles.profileHeaderCover}`}
                  ></div>

                  {/* Profile Content */}
                  <div
                    className={`profile-header-content ${styles.profileHeaderContent}`}
                  >
                    {/* Profile Image */}
                    <div
                      className={`profile-header-img ${styles.profileHeaderImg}`}
                    >
                      {/* Display profile picture or a default one */}
                      <img
                        src={
                          user?.profile_picture
                            ? user.profile_picture
                            : "default-user-avatar.png"
                        }
                        alt="User Avatar"
                      />
                    </div>

                    {/* Profile Info */}
                    <div
                      className={`profile-header-info ${styles.profileHeaderInfo}`}
                    >
                      <h4 className="m-t-10 m-b-5">
                        Name: {user.first_name} {user.last_name}
                      </h4>
                      <p className="m-b-10">
                        <h4 style={{ display: "inline" }}>Bio: </h4>{" "}
                        {user.bio || "No bio"}
                      </p>
                      <button
                        className="btn authLink"
                        onClick={() => navigate("/edit-profile")}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Profile Tabs */}
                  {/* You can add the tab navigation here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileContent />
      {/* <Hikaya3d></Hikaya3d> */}
    </>
  );
};

export default UserProfile;
