import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Entertainment.css";
import { useNavigate } from "react-router-dom";
import image15 from "../images/image 15.png";

const Entertainment = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const apiKey = "154aab0d1fcc73a7638bb03a0dae2654";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];

    const fetchDataForCategories = async (categories) => {
      try {
        const promises = categories.map(async (category) => {
          const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                api_key: apiKey,
                with_genres: category,
                page: 1,
              },
            }
          );
          console.log(
            "API Response for genre ID: ",
            category,
            response.data.results
          );
          const data = response.data.results;

          const shuffledData = data.sort(() => Math.random() - 0.5);

          const uniqueMovies = removeDuplicates(shuffledData, "id");

          const limitedData = uniqueMovies.slice(0, 5);

          return { category, data: limitedData };
        });

        const results = await Promise.all(promises);
        setSelectedCategories(results);
      } catch (error) {
        console.error("Error fetching data for categories:", error);
      }
    };

    function removeDuplicates(array, key) {
      return array.filter((item, index, self) => {
        return self.findIndex((i) => i[key] === item[key]) === index;
      });
    }

    fetchDataForCategories(storedCategories);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="movies-container">
      <h2>Super app</h2>
      <h3>Entertainment according to your choice</h3>
      <button className="home-btn" onClick={handleClick}>
        <img src={image15} alt="image15" />
      </button>
      {selectedCategories.map((categoryData) => (
        <div key={categoryData.category} className="categories-section">
          <h2>{categoryData.category}</h2>
          <div className="movies_section">
            {Array.isArray(categoryData.data) &&
            categoryData.data.length > 0 ? (
              categoryData.data.map((movie) => (
                <div key={movie.id} className="movie">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No movies found for the selected {categoryData.category}.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Entertainment;
