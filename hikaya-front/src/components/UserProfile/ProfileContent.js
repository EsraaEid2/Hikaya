import React, { useState, useEffect } from "react";
import styles from "./ProfileContent.css";
import axios from "axios";
import UserStories from './userStories';
import UserLikes from './userLikes';

const ProfileContent = () => {
  const [selectedTab, setSelectedTab] = useState("completeStories"); // Default tab is 'Complete Stories'
  const [completeStories, setCompleteStories] = useState([]);
  const [draftStories, setDraftStories] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  
  const userId = localStorage.getItem("id"); // Assuming the user ID is stored in localStorage
  
  // Fetch stories based on the tab selected
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedTab === "completeStories") {
          const response = await axios.get(`/api/user-stories/${userId}?status=complete`);
          setCompleteStories(response.data);
        } else if (selectedTab === "draftStories") {
          const response = await axios.get(`/api/user-stories/${userId}?status=draft`);
          setDraftStories(response.data);
        } else if (selectedTab === "yourActivity") {
          const response = await axios.get(`/api/user-activity/${userId}`);
          setUserActivity(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedTab, userId]); // Fetch data whenever selectedTab changes

  const handleTabClick = (tab) => {
    setSelectedTab(tab); // Switch between tabs
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "completeStories":
        return (
          <div>
            {completeStories.length > 0 ? (
              completeStories.map((story) => (
                <li key={story.story_id}>
                  <div className={`timeline-time ${styles.timelineTime}`}>
                    <span className="date">
                      {new Date(story.created_at).toLocaleDateString()}
                    </span>
                    <span className="time">
                      {new Date(story.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`timeline-body ${styles.timelineBody}`}>
                    <h5 className={styles.storyTitle}>{story.title}</h5>
                    <p>{story.content}</p>
                    {story.story_picture && <img src={story.story_picture} alt="Story" />}
                  </div>
                </li>
              ))
            ) : (
              <div className=" container container-cards">
                <UserStories/>
              </div>
            )}
          </div>
        );
      
      case "yourActivity":
        return (
          <div>
            {userActivity.length > 0 ? (
              userActivity.map((activity, index) => (
                <div key={index} className={styles.activity}>
                  <p>{activity.description}</p>
                  <span>{new Date(activity.timestamp).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="container container-cards">
              <UserLikes/>
            </div>
            )}
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      {/* Profile Content */}
      <div className={`profile-content ${styles.profileContent}`}>
        {/* Tabs */}
        <ul className={`profile-header-tab nav nav-tabs ${styles.profileHeaderTab}`}>
          <li className="nav-item">
            <a
              href="javascript:void(0);"
              className={`nav-link ${selectedTab === "completeStories" ? "active" : ""}`}
              onClick={() => handleTabClick("completeStories")}
            >
              Your Stories
            </a>
          </li>
         
          <li className="nav-item">
            <a
              href="javascript:void(0);"
              className={`nav-link ${selectedTab === "yourActivity" ? "active" : ""}`}
              onClick={() => handleTabClick("yourActivity")}
            >
              Your Activity
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className={`profile-content-body ${styles.profileContentBody}`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
