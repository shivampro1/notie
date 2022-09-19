import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/noteContext";
import Noteitems from "./Noteitems";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(noteContext);
  const { notes, GetNotes, UpdateNotes } = context;
  const [note, setNote] = useState({ etitle: "", edescription: "" });
  const navigate = useNavigate();
  // const [title, settitle] = useState("");
  // const [description, setdescription] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      GetNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refClose.current.click();
    UpdateNotes(note.id, note.etitle, note.edescription);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h1> Update Note</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" name="etitle" className="form-label">
                      Title
                    </label>
                    <input type="text" onChange={handleChange} value={note.etitle} className="form-control" id="etitle" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" name="edescription" className="form-label">
                      Description
                    </label>
                    <input type="text" onChange={handleChange} value={note.edescription} className="form-control" id="edescription" />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" onClick={handleSubmit} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <Noteitems
              key={note._id}
              notes={note}
              updateNote={() => {
                updateNote(note);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
