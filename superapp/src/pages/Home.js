import React from "react";
import "../styles/Home.css";
import News from "../components/News";
import Notes from "../components/Notes";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import Weather from "../components/Weather";
import Profile from "../components/Profile";

function Home() {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate("/entertainment");
  };

  return (
    <div className="container">
      <div className="hleft">
        {<Profile />}
        {<Weather />}
      </div>
      <div>{<Notes />}</div>
      <div>{<Timer />}</div>
      <div>{<News />}</div>
      <button className="browse-btn" onClick={handleBrowse}>
        Browse
      </button>
    </div>
  );
}
export default Home;
