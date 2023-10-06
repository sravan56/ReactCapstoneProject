import React from "react";
import "../styles/Home.css";

const Notes = () => {
  return (
    <div className="notes-container">
      <div className="notes-area">
        <h2>All Notes</h2>
        <textarea placeholder="All Notes"></textarea>
      </div>
    </div>
  );
};

export default Notes;
