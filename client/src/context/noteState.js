import { useState } from "react";
import NoteContext from "./noteContext";
const URL = "https://notieapp.herokuapp.com";

const NoteState = (props) => {
  const inotes = [];
  const [notes, setNotes] = useState(inotes);

  const AddNote = async (title, description) => {
    // console.log("adding note");
    const url = `${URL}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description }),
      // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);

    setNotes(notes.concat(json));
  };

  const GetNotes = async () => {
    const url = `${URL}/api/notes/getallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  const DeleteNote = async (id) => {
    const url = `${URL}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body data type must match "Content-Type" header
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    // console.log(response);
  };

  const UpdateNotes = async (id, title, description) => {
    // console.log(id);
    const url = `${URL}/api/notes/updatenote/${id}`;
    // console.log(url + `${id}`);
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description }),
      // body data type must match "Content-Type" header
    });
    // console.log(response);
    // console.log("title " + title);
    // console.log("descrip " + description);
    // // const jsonn = response.json();
    // // console.log(jsonn);
    // // const { id, title, description } = props;
    // console.log("Update Note" + id);
    // console.log("Notes: " + (await notes[0].title));
    // // console.log("Notes sting: " + stringify(notes));
    // console.log("Notes json.: " + (await JSON.stringify(notes)));
    // console.log("Notes: " + (await JSON.parse(JSON.stringify(notes))));
    const newNotes = await JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      // const element = newNotes[index];
      if (notes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);

    // const json = await response.json();
  };

  return <NoteContext.Provider value={{ notes, setNotes, AddNote, DeleteNote, UpdateNotes, GetNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
