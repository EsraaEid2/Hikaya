import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from './userStories.module.css'; // Import the CSS module

// Fetch userId from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : null;

const UserStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      console.log('Fetching stories for userId:', userId);

      // Fetch all stories for the user
      fetch(`http://127.0.0.1:8000/api/user/${userId}/stories`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data);
          if (Array.isArray(data)) {
            setStories(data);
          } else {
            setStories([]);
          }
        })
        .catch((error) => console.error('Error fetching stories:', error));
    }
  }, [userId]);

  // Function to delete a story with confirmation
  const deleteStory = (storyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/user/${userId}/stories/${storyId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // Remove the deleted story from the UI
              setStories((prevStories) =>
                prevStories.filter((story) => story.story_id !== storyId)
              );
              Swal.fire(
                'Deleted!',
                'Your story has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Error!',
                'There was an issue deleting your story.',
                'error'
              );
            }
          })
          .catch((error) => {
            console.error('Error deleting story:', error);
            Swal.fire(
              'Error!',
              'There was an issue deleting your story.',
              'error'
            );
          });
      }
    });
  };

  // Function to navigate to the story page
  const goToStory = (storyId) => {
    navigate(`/readStory/${storyId}`);
  };

  return (
    <div>
  {stories.length > 0 ? (
    <div className={styles.containerCards}>
      {stories.map((story) => (
        <div
          key={story.story_id}
          className={styles.book}
          style={{
            position: 'relative', // Position relative to control layering
            overflow: 'hidden', // To prevent the background from spilling outside
          }}
        >
          {/* Background with opacity */}
          <div
            className={styles.background}
            style={{
              backgroundImage: `url('${story.story_picture}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4,  // Apply opacity to the background only
              position: 'absolute', // Position it behind the content
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,  // Ensure the background stays behind content
               display: 'flex',
    flexDirection: 'column', // Ensures the children are aligned in a column
    justifyContent: 'flex-end', // Aligns the title at the bottom of the container
    height: '100%', //
            }}
          >

          </div>
          <div
              className={styles.title} 
              onClick={() => goToStory(story.story_id)} // Navigate to read story
            >
              <strong> {story.title}</strong>
            </div>
          <a href={`/readStory/${story.story_id}`} className={styles.storyLink}>
          <button className="readButton"> Read the story now!</button>
          </a>

          <div className={styles.cover}style={{
                  backgroundImage: `url('${story.story_picture}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
            <div
              className={styles.title}  
              onClick={() => goToStory(story.story_id)} // Navigate to read story
            >
              <button className="titleButton" style={{opacity:0.4,background:'black'}}>{story.title} </button> 
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => deleteStory(story.story_id)}
              className={styles.deleteButton}
            >
              <i className="bi bi-trash-fill"></i> Delete the story?
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No stories available.</p>
  )}
</div>

  );
};

export default UserStories;
