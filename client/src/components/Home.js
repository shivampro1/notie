import React, { useState } from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";

function Home() {
  return (
    <>
      <AddNotes />
      <Notes />
    </>
  );
}

export default Home;
