import React, { PropsWithChildren, useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";

const NotesContainer = () => {
  const [i, setI] = useState(0);
  const [noteEditorOpen, setNoteEditorOpen] = useState(false);
  const draftNewNote = () => {
    setI(i + 1);
    setNoteEditorOpen(true);
  };

  return (
    <div>
      {noteEditorOpen && <NoteEditor></NoteEditor>}
      <p>{i}</p>
      <button onClick={draftNewNote}>+</button>
    </div>
  );
};
export default NotesContainer;
