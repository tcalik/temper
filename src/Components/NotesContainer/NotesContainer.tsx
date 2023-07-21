import React, { useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import { editorActions } from "../../store/editorStore";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import Note from "../Note/Note";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import "./NotesContainer.css"

const NotesContainer = () => {
  const dispatch = useDispatch();
  const [draftContent, setDraftContent] = useState("");

  const noteEditorOpen = useSelector(
    (state: SharedStateInterface) => state.editor.showEditor
  );
  const savedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.currentNotes
  );

  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };
  const addNewNote = () => {
    dispatch(
      notesActions.addNote({ id: Math.random(), draftContent: draftContent })
    );
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

  interface noteInterface {
    id: number;
    content: string;
  }

  return (
    <div className="NotesContainer">
      <div className="NoteEditorContainer">
        {!noteEditorOpen && <button className="NewNoteButton" onClick={draftNewNote}>+</button>}
        {noteEditorOpen && (
          <NoteEditor
            changeDraft={draftChangeHandler}
            saveDraft={saveTemplate}
            currContent={draftContent}
            closeEditor={closeDraft}
          ></NoteEditor>
        )}
      </div>
      {savedNotes.map((value: noteInterface) => {
        return <Note key={value.id} id={value.id}></Note>;
      })}
    </div>
  );
};

export default NotesContainer;
