import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import { editorActions } from "../../store/editorStore";
import { notesActions } from "../../store/notesStore";
import NoteEditor from "../NoteEditor/NoteEditor";
import './NoteEditorArea.css'

const NoteEditorArea = () => {
  const dispatch = useDispatch();
  const [draftContent, setDraftContent] = useState("");

  const noteEditorOpen = useSelector(
    (state: SharedStateInterface) => state.editor.showEditor
  );

  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };
  const addNewNote = () => {
    dispatch(notesActions.addNote({ draftContent: draftContent }));
  };

  // save draft to current component state
  const draftChangeHandler = (value: string) => {
    setDraftContent(value);
  };

  // add note to redux-toolkit store, reset draft
  const saveTemplate = () => {
    if (draftContent !== "") {
      toggleEditorHandler();
      setDraftContent("");
      addNewNote();
    }
  };

  const closeDraft = () => {
    toggleEditorHandler();
  };

  const draftNewNote = () => {
    toggleEditorHandler();
  };
  return (
    <div className="NoteEditorContainer">
      {!noteEditorOpen && (
        <button className="NewNoteButton" onClick={draftNewNote}>
          +
        </button>
      )}
      {noteEditorOpen && (
        <NoteEditor
          changeDraft={draftChangeHandler}
          saveDraft={saveTemplate}
          currContent={draftContent}
          closeEditor={closeDraft}
        ></NoteEditor>
      )}
    </div>
  );
};

export default NoteEditorArea;
