import React, { useState, useContext } from "react";
import noteContext from "../context/noteContext";
import Notes from "./Notes";

function AddNotes() {
  const [note, setNote] = useState({ title: "", description: "" });

  const { AddNote, notes, setNotes } = useContext(noteContext);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AddNote(title, description);
    setdescription("");
    settitle("");
  };
  const handleTitle = (e) => {
    settitle(e.target.value);
    // console.log(e.target.value);
    // setNotes({ ...notes, [e.target.name]: title });
    // console.log(e.target.value);
  };
  const handleDescription = (e) => {
    setdescription(e.target.value);
    // setNote(e.target.name : e.target.value)
    // console.log(e.target.value);
    // setNotes({ [e.target.name]: description });
    // console.log(e.target.value);
  };
  //   const handleDescription = (e) => {
  //     setDescription({ ...notes, [e.target.name]: e.target.value });
  //   };

  return (
    <div className="container my-3">
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" name="title" className="form-label">
            Title
          </label>
          <input type="text" onChange={handleTitle} className="form-control" value={title} id="title" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" name="description" className="form-label">
            Description
          </label>
          <input type="text" onChange={handleDescription} value={description} className="form-control" id="description" />
        </div>
        <button type="submit" disabled={title.length < 5 || description.length < 5} className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNotes;
