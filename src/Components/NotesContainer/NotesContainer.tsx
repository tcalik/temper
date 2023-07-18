import React, { useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import { editorActions } from "../../store/editorStore";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";

const NotesContainer = () => {
  const [draftContent, setDraftContent] = useState("");

  const dispatch = useDispatch();
  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };

  //dispatch redux-toolkit action to save note
  const addNewNote = () => {
    dispatch(notesActions.addNote(draftContent));
  };

  // save draft to current component state
  const draftChangeHandler = (value: any) => {
    setDraftContent(value);
  };

  // add note to redux-toolkit store, reset draft
  const saveTemplate = () => {
    toggleEditorHandler();
    setDraftContent("");
    addNewNote();
  };

  const closeDraft = () => {
    toggleEditorHandler();
  };

  const [i, setI] = useState(0);
  const noteEditorOpen = useSelector((state: any) => state.editor.showEditor);

  const draftNewNote = () => {
    setI(i + 1);
    toggleEditorHandler();
  };

  return (
    <div>
      {noteEditorOpen && (
        <NoteEditor
          changeDraft={draftChangeHandler}
          saveDraft={saveTemplate}
          currContent={draftContent}
          closeEditor={closeDraft}
        ></NoteEditor>
      )}
      <p>{i}</p>
      {!noteEditorOpen && <button onClick={draftNewNote}>+</button>}
    </div>
  );
};

export default NotesContainer;
