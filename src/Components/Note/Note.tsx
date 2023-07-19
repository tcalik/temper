import React, { useState } from "react";
import { useSelector } from "react-redux";
import ActiveNote from "../ActiveNote/ActiveNote";
import PassiveNote from "../PassiveNote/PassiveNote";
import "./Note.css";

const Note = (props: any) => {
  const savedNotes = useSelector((state: any) => state.notes.currentNotes);

  const [isActive, setIsActive] = useState(false);

  const activateEdit = () => {
    setIsActive(true);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(currentContent);
  };

  const saveNote = () => {
    console.log(props.id);
  };

  const cancelEdit = () =>{
    setIsActive(false);
  }

  const currentContent = savedNotes.find((note: any) => {
    return note.id === props.id;
  }).content;

  console.log(currentContent);
  return (
    <div className="NoteArea">
      {isActive ? (
        <ActiveNote content={currentContent} saveNote={saveNote} cancelEdit={cancelEdit}>
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
