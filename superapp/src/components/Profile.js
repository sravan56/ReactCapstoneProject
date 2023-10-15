import React, { useState, useEffect } from "react";
import image14 from "../images/image 14.png";

const Profile = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedCategories = JSON.parse(
      localStorage.getItem("selectedCategories")
    );
    if (storedCategories) {
      setSelectedCategories(storedCategories);
    }
  }, []);
  return (
    <div className="profile">
      <img src={image14} alt="pic"></img>
      <div className="details">
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        <h1>{user.userName}</h1>
        <div className="list">
          {selectedCategories.map((categoryName) => (
            <div key={categoryName}>
              <h2>{categoryName}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
