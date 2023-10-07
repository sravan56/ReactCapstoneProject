import React, { useState, useEffect } from "react";
import "../styles/Home.css";

const Notes = () => {
  const [note, setNote] = useState("");
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    setNote(savedNotes);
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(note));
  }, [note]);
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  return (
    <div className="notes-container">
      <div className="notes-area">
        <h2>All Notes</h2>
        <textarea
          placeholder="All Notes"
          value={note}
          onChange={handleNoteChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;
