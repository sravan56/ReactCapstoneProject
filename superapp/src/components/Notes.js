import React, { useState, useEffect } from "react";
import "../styles/Notes.css";

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
          placeholder="This is how I am going to Learn MERN stack in 3 Months"
          value={note}
          onChange={handleNoteChange}
        >
          {note}
        </textarea>
      </div>
    </div>
  );
};

export default Notes;
