import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./EditProfile.css";
import { useAuth } from "../../pages/AuthContext";

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : null;


const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState(""); // New bio field
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(""); // For previewing the image
  const [selectedFile, setSelectedFile] = useState(null); // To hold the actual file for uploading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user-profile/${userId}`
        );
        const userData = response.data;
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setBio(userData.bio); // Set bio from fetched data
        setProfilePic(userData.profile_picture || "default-avatar.png");
        user.profile_picture = userData.profile_picture;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      user.profile_picture = file;
      localStorage.setItem("user", JSON.stringify(user));
      setProfilePic(URL.createObjectURL(file)); // Generate preview URL
      setSelectedFile(file); // Store the file for the form data submission
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData with text fields and file
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);

    // Only append profile picture if a new one is selected
    if (selectedFile) {
      formData.append("profile_picture", selectedFile);
    } else {
      formData.append("profile_picture", "");
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/edit-profile/${userId}`,
        formData,

        {

          headers: {
            "Content-Type": "multipart/form-data", // File upload requires this header
          },

        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          user.profile_picture = response.data.message;
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, profile_picture: response.data.message })
          );

          const profileImageElement = document.querySelector(".profile-image"); // Get the image element with the class 'profile-image'

          if (profileImageElement) {
            profileImageElement.src = response.data.message; // Update the image source
          }

          navigate("/profile");
        } else {
          console.error("User not found in localStorage.");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form
        className="edit-profile-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="profile-pic-section">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <label className="upload-label">
            Change Picture
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="inputfile "
              accept="image/*"
            />
          </label>
        </div>

        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
