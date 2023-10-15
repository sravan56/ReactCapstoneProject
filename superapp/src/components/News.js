import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/News.css";

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
  }, []);

  const firstNewsArticle = newsData.length > 0 ? newsData[0] : null;

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""}${month}-${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours > 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

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
            <h4>{`${formatDate(
              new Date(firstNewsArticle.publishedAt)
            )} | ${formatTime(new Date(firstNewsArticle.publishedAt))}`}</h4>
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
