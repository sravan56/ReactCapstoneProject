import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6dd44ad13db44f4da2cd0deb4650f202`
      )
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching News", error);
      });
  });
  const firstNewsArticle = newsData.length > 0 ? newsData[0] : null;
  return (
    <div className="news-container">
      {firstNewsArticle ? (
        <div className="news-details">
          <img
            src={firstNewsArticle.urlToImage}
            alt={firstNewsArticle.title}
          ></img>
          <div className="news-title">
            <h3>{firstNewsArticle.title}</h3>
            <h4>{firstNewsArticle.publishedAt}</h4>
          </div>
          <p>{firstNewsArticle.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default News;
