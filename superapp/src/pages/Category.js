import React, { useState, useEffect } from "react";
import "../styles/Category.css";
import image2 from "../images/image 2.png";
import image3 from "../images/image 3.png";
import image4 from "../images/image 4.png";
import image6 from "../images/image 6.png";
import image7 from "../images/image 7.png";
import image8 from "../images/image 8.png";
import image9 from "../images/image 9.png";
import image10 from "../images/image 10.png";
import image11 from "../images/image 11.png";
import { useNavigate } from "react-router-dom";
import mark from "../images/Vector.png";

const Category = () => {
  const categories = [
    { id: 1, name: "Action", color: "#FF5209", image: image2, selected: false },
    { id: 2, name: "Drama", color: "#D7A4FF", image: image3, selected: false },
    {
      id: 3,
      name: "Romance",
      color: "#148A08",
      image: image4,
      selected: false,
    },
    {
      id: 4,
      name: "Thriller",
      color: "#84C2FF",
      image: image6,
      selected: false,
    },
    {
      id: 5,
      name: "Western",
      color: "#902500",
      image: image7,
      selected: false,
    },
    { id: 6, name: "Horror", color: "#7358FF", image: image8, selected: false },
    {
      id: 7,
      name: "Fantasy",
      color: "#FF4ADE",
      image: image9,
      selected: false,
    },
    { id: 8, name: "Music", color: "#E61E32", image: image10, selected: false },
    {
      id: 9,
      name: "Fiction",
      color: "#6CD061",
      image: image11,
      selected: false,
    },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories = JSON.parse(
      localStorage.getItem("selectedCategories")
    );
    if (storedCategories) {
      setSelectedCategories(storedCategories);
    }
  }, []);

  const updateLocalStorage = (categories) => {
    localStorage.setItem("selectedCategories", JSON.stringify(categories));
  };

  const handleCategoryClick = (categoryName) => {
    const updatedCategories = categories.map((category) =>
      category.name === categoryName
        ? { ...category, selected: !category.selected }
        : category
    );

    const selected = updatedCategories
      .filter((category) => category.selected)
      .map((category) => category.name);

    if (selected.length <= 3) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryName]);
      checkCategoryCount(updatedCategories);
    }
  };
  const checkCategoryCount = (updatedCategories) => {
    if (updatedCategories.length < 3) {
      setError("minimum 3 categories required");
    } else {
      setError("");
    }
  };
  const handleRemoveCategory = (categoryName) => {
    const updatedSelectedCategories = selectedCategories.filter(
      (category) => category !== categoryName
    );
    setSelectedCategories(updatedSelectedCategories);
    updateLocalStorage(updatedSelectedCategories);
  };

  const handleNextPage = () => {
    if (selectedCategories.length < 3) {
      setError("Minimum 3 categories required");
    } else {
      updateLocalStorage([...selectedCategories]);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Super app</h1>
        <h2>Choose your entertainment category</h2>
        <div className="selected">
          {selectedCategories.map((categoryName) => (
            <div key={categoryName} className="selected-category">
              <span>{categoryName}</span>
              <button onClick={() => handleRemoveCategory(categoryName)}>
                X
              </button>
            </div>
          ))}
        </div>
        {error && (
          <p className="error">
            <img src={mark} alt="mark"></img>
            {error}
          </p>
        )}
      </div>
      <div className="right">
        {categories.map((category) => (
          <button
            key={category.id}
            className={category.selected ? "selected" : ""}
            style={{ backgroundColor: category.color }}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
            <img src={category.image} alt={category.name}></img>
          </button>
        ))}
      </div>
      <button className="next" onClick={handleNextPage}>
        Next Page
      </button>
    </div>
  );
};

export default Category;
