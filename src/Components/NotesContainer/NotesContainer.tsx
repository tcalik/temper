import React, { useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import { editorActions } from "../../store/editorStore";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import Note from "../Note/Note";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";

const NotesContainer = () => {
  const [draftContent, setDraftContent] = useState("");
  const [i, setI] = useState(0);

  const noteEditorOpen = useSelector(
    (state: SharedStateInterface) => state.editor.showEditor
  );
  const savedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.currentNotes
  );
  const dispatch = useDispatch();

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
    toggleEditorHandler();
    setDraftContent("");
    addNewNote();
  };

  const closeDraft = () => {
    toggleEditorHandler();
  };

  const draftNewNote = () => {
    setI(i + 1);
    toggleEditorHandler();
  };

  interface noteInterface {
    id: number;
    content: string;
  }

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
      {savedNotes.map((value: noteInterface) => {
        return <Note key={value.id} id={value.id}></Note>;
      })}
    </div>
  );
};

export default NotesContainer;
