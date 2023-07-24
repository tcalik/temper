import React, { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notesStore";
import "./ActiveNote.css";
interface ActiveNotePropsInterface {
  saveNote: Function;
  cancelEdit: MouseEventHandler;
  content: string;
  noteId: string;
}
const ActiveNote = (props: ActiveNotePropsInterface) => {
  const dispatch = useDispatch();
  const [draftNoteContent, setDraftNoteContent] = useState(props.content);

  const deleteNoteAction = () => {
    dispatch(notesActions.deleteNote({ id: props.noteId }));
  };

  const deleteNote = () => {
    deleteNoteAction();
  };

  const setupTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight - 5 + "px";
    event.target.style.overflow = "hidden";
  };

  const draftCurrentNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftNoteContent(event.target.value);
    setupTextareaHeight(event);
  };

  const saveEditedNote = () => {
    props.saveNote(draftNoteContent);
  };

  return (
    <div>
      <div className="ButtonBar">
        <button className="NoteButton CancelButton" onClick={props.cancelEdit}>
          Cancel
        </button>
        <button className="DeleteButton " onClick={deleteNote}>
          Delete
        </button>
        <button className="NoteButton SaveButton" onClick={saveEditedNote}>
          Save
        </button>
      </div>
      <textarea
        defaultValue={props.content}
        onChange={draftCurrentNote}
        onFocus={setupTextareaHeight}
        autoFocus
      ></textarea>
    </div>
  );
};

export default ActiveNote;
