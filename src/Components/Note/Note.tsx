import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import ActiveNote from "../ActiveNote/ActiveNote";
import PassiveNote from "../PassiveNote/PassiveNote";
import "./Note.css";
import NoteInterface from "../../Interfaces/NoteInterface";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import copyToClipboard from "../../utils/copyToClipboard"

interface NotePropsInterface {
  id: string;
}

const Note = (props: NotePropsInterface) => {
  const dispatch = useDispatch();
  const savedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.currentNotes
  );
  const substitutedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.editedNotes
  );

  const editNote = (text: string) => {
    dispatch(notesActions.editNote({ id: props.id, text: text }));
  };

  const [isActive, setIsActive] = useState(false);

  const activateEdit = () => {
    setIsActive(true);
  };
 

  const copyContent = () => {
    //navigator.clipboard.writeText(substitutedContent);
    try {
      copyToClipboard(substitutedContent);
    } catch (error) {
      console.error("Unable to copy");
    }
  };

  const saveNote = (text: string) => {
    setIsActive(false);
    editNote(text);
  };

  const cancelEdit = () => {
    setIsActive(false);
  };

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
          noteId={props.id}
        />
      ) : (
        <PassiveNote
          copyContent={copyContent}
          activateEdit={activateEdit}
          content={substitutedContent}
        />
      )}
    </div>
  );
};

export default Note;
