import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import ActiveNote from "../ActiveNote/ActiveNote";
import PassiveNote from "../PassiveNote/PassiveNote";
import "./Note.css";
import NoteInterface from "../../Interfaces/NoteInterface";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";

interface NotePropsInterface {
  id: number;
}

const Note = (props: NotePropsInterface) => {
  const dispatch = useDispatch();
  const savedNotes = useSelector((state: SharedStateInterface) => state.notes.currentNotes);
  const substitutedNotes = useSelector((state: SharedStateInterface) => state.notes.editedNotes);

  const editNote = (text: string) => {
    dispatch(notesActions.editNote({ id: props.id, text: text }));
  };
  const deleteNoteAction = () => {
    dispatch(notesActions.deleteNote({ id: props.id }));
  };

  const [isActive, setIsActive] = useState(false);

  const activateEdit = () => {
    setIsActive(true);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(substitutedContent);
  };

  const saveNote = (text: string) => {
    setIsActive(false);
    editNote(text);
  };

  const cancelEdit = () => {
    setIsActive(false);
  };

  const deleteNote = () => {
    deleteNoteAction();
  }

  const currentNoteById = savedNotes.find((note: NoteInterface) => {
    return note.id === props.id;
  });
  let currentContent: string;
  currentNoteById
    ? (currentContent = currentNoteById.content)
    : (currentContent = "");

  const substitutedNoteById = substitutedNotes.find((note: NoteInterface) => {
    return note.id === props.id;
  });
  let substitutedContent: string;
  substitutedNoteById
    ? (substitutedContent = substitutedNoteById.content)
    : (substitutedContent = "");

  return (
    <div className="NoteArea">
      {isActive ? (
        <ActiveNote
          content={currentContent}
          saveNote={saveNote}
          cancelEdit={cancelEdit}
        />
      ) : (
        <PassiveNote
          copyContent={copyContent}
          activateEdit={activateEdit}
          content={substitutedContent}
        />
      )}
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
};

export default Note;
