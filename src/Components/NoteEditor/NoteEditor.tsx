import React from "react";
import { editorActions } from "../../store/editorStore";
import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notesStore";

const NoteEditor = () => {
  const dispatch = useDispatch();
  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };
  const addNewNote = () => {
    dispatch(notesActions.addNote("test"));
  };

  const saveTemplate = () => {
    toggleEditorHandler();
    addNewNote();
  };
  return (
    <div>
      <textarea></textarea>
      <button onClick={saveTemplate}>Save</button>
    </div>
  );
};

export default NoteEditor;
