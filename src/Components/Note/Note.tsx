import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import ActiveNote from "../ActiveNote/ActiveNote";
import PassiveNote from "../PassiveNote/PassiveNote";
import "./Note.css";

const Note = (props: any) => {
  const dispatch = useDispatch();
  const savedNotes = useSelector((state: any) => state.notes.currentNotes);

  const editNote = (text: string) => {
    dispatch(notesActions.editNote({ id: props.id, text: text }));
  };

  const [isActive, setIsActive] = useState(false);

  const activateEdit = () => {
    setIsActive(true);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(currentContent);
  };

  const saveNote = (text: string) => {
    setIsActive(false);
    editNote(text);
  };

  const cancelEdit = () => {
    setIsActive(false);
  };

  const currentContent = savedNotes.find((note: any) => {
    return note.id === props.id;
  }).content;

  return (
    <div className="NoteArea">
      {isActive ? (
        <ActiveNote
          content={currentContent}
          saveNote={saveNote}
          cancelEdit={cancelEdit}
        >
          {" "}
        </ActiveNote>
      ) : (
        <PassiveNote
          copyContent={copyContent}
          activateEdit={activateEdit}
          content={currentContent}
        ></PassiveNote>
      )}
    </div>
  );
};

export default Note;
