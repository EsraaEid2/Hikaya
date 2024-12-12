import React, { useState } from "react";
import "./SearchComponent.css";
import StoriesList from "../../components/story_components/storiesList";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const categoryIndex = parseInt(value); // Convert the string value to an integer

    setSelectedCategories(
      (prevCategories) =>
        checked
          ? [...prevCategories, categoryIndex] // Add category index
          : prevCategories.filter((category) => category !== categoryIndex) // Remove category index
    );
  };

  const categories = [
    { name: "Adventure", icon: "fa-hiking" },
    { name: "Drama", icon: "fa-theater-masks" },
    { name: "Fantasy", icon: "fa-magic" },
    { name: "Horror", icon: "fa-ghost" },
    { name: "Romance", icon: "fa-heart" },
    { name: "Sci-Fi", icon: "fa-robot" },
  ];

  return (
    <>
      <div className="search-component">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          <i className="fa fa-search search-icon"></i>
        </div>
        <div className="checkbox-group">
          {categories.map((category, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                value={index + 1} // Store values starting from 1, not 0
                onChange={handleCategoryChange}
                className="category-checkbox"
              />
              <label className="category-label">
                <i className={`fa ${category.icon} category-icon`}></i>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Pass query and selectedCategories as props to StoriesList */}
      <StoriesList query={query} selectedCategories={selectedCategories} />
    </>
  );
};

export default SearchComponent;
