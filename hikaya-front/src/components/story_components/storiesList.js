import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./storiesList.css";

const StoriesList = ({ query, selectedCategories }) => {
  const [stories, setStories] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    // Fetch stories from the Laravel API
    axios
      .get("http://localhost:8000/api/stories")
      .then((response) => {
        const fetchedStories = response.data;

        // Get liked stories from localStorage
        const likedStories =
          JSON.parse(localStorage.getItem("likedStories")) || [];

        // Update stories with the persisted liked status
        const updatedStories = fetchedStories.map((story) => {
          return { ...story, liked: likedStories.includes(story.story_id) };
        });

        setStories(updatedStories);
      })
      .catch((error) => {
        console.error("There was an error fetching the stories!", error);
      });
  }, []);

  const toggleLike = (storyId) => {
    if (userId) {
      axios
        .post(`http://localhost:8000/api/stories/${storyId}/toggle-like`, {
          user_id: userId,
        })
        .then(() => {
          const updatedStories = stories.map((story) => {
            if (story.story_id === storyId) {
              const newLikedStatus = !story.liked;

              // Save to local storage to persist the like status
              const likedStories =
                JSON.parse(localStorage.getItem("likedStories")) || [];
              if (newLikedStatus) {
                likedStories.push(storyId);
              } else {
                const index = likedStories.indexOf(storyId);
                if (index > -1) likedStories.splice(index, 1);
              }
              localStorage.setItem(
                "likedStories",
                JSON.stringify(likedStories)
              ); // Store in localStorage

              return { ...story, liked: newLikedStatus };
            }
            return story;
          });
          setStories(updatedStories);
        })
        .catch((error) => {
          console.error("There was an error toggling the like!", error);
        });
    } else {
      console.error("User is not authenticated");
    }
  };

  // Filter stories based on query and categories
  const filteredStories = stories.filter((story) => {
    const matchesQuery =
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.content.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => story.category_id === category);

    return matchesQuery && matchesCategory;
  });

  return (
    <section className="dark">
      <div className="container py-4">
        <div className="row">
          {filteredStories.map((story) => (
            <div className="col-lg-4 col-md-6 mb-4" key={story.story_id}>
              <article className="postcard dark blue">
                <Link
                  className="postcard__img_link"
                  to={`/readStory/${story.story_id}`}
                >
                  <img
                    className="postcard__img"
                    src={
                      story.story_picture ||
                      "https://via.placeholder.com/600x300"
                    }
                    alt={story.title}
                  />
                </Link>
                <div className="postcard__text">
                  <div className="postcard__header">
                    <h1 className="postcard__title blue">
                      <Link to={`/readStory/${story.story_id}`}>
                        {story.title}
                      </Link>
                    </h1>
                    <button 
                      onClick={() => toggleLike(story.story_id)}
                      className={`btn btn-outline-danger btn-sm bookmark-btn ${story.liked ? 'liked' : ''}`}
                    >
                      <i
                        className={
                          story.liked
                            ? "bi bi-bookmark-check"
                            : "bi bi-bookmark"
                        }
                      ></i>
                    </button>


                  </div>

                  <div className="postcard__subtitle small">
                    <span dateTime={story.created_at}>
                      <i className="fas fa-calendar-alt mr-2"></i>
                      {story.created_at
                        ? new Date(story.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="postcard__bar"></div>
                  <div
                    className="postcard__preview-txt"
                    dangerouslySetInnerHTML={{
                      __html:
                        story.content
                          .substring(0, 100)
                          .replace(/\s+/g, " ")
                          .trim() + "...",
                    }}
                  ></div>
                                <div className="postcard__tagbox">
                <div className="tag__item">
                  <i className="bi bi-tag"></i>{" "}
                  {story.category.category_name}
                </div>

                <div className="tag__item play blue">
                  <Link to={`/readStory/${story.story_id}`}>
                    <i className="bi bi-book"></i> Read story
                  </Link>
                </div>
              </div>

                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesList;
