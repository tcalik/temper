import React from "react";
import { editorActions } from "../../store";
import { useDispatch } from "react-redux";

const NoteEditor = () => {
  const dispatch = useDispatch();
  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };

  const saveTemplate = () => {
    toggleEditorHandler();
  };
  return (
    <div>
      <textarea></textarea>
      <button onClick={saveTemplate}>Save</button>
    </div>
  );
};

export default NoteEditor;
