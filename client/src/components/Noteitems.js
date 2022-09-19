import React, { useContext } from "react";
import noteContext from "../context/noteContext";

function Noteitems(props) {
  const context = useContext(noteContext);
  const { DeleteNote } = context;
  const { notes, updateNote } = props;
  const deleteNote = (id) => {
    DeleteNote(id);
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body ">
            <h6 className="card-title">{notes.title}</h6>
            <p className="card-text">{notes.description}</p>
            <i
              className="fa-solid fa-trash-can me-3"
              onClick={() => {
                deleteNote(notes._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square "
              onClick={() => {
                updateNote();
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Noteitems;
