import React, { useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import { editorActions } from "../../store/editorStore";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import Note from "../Note/Note";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import "./NotesContainer.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NoteInterface from "../../Interfaces/NoteInterface";

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
      notesActions.addNote({ draftContent: draftContent })
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

  return (
    <div className="NotesContainer">
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          300: 1,
          600: 2,
          900: 3,
          1200: 4,
          1500: 5,
          1800: 6,
          2100: 7,
          2400: 8
        }}
      >
        <Masonry>
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
          {savedNotes.map((value: NoteInterface) => {
            return <Note key={value.id} id={value.id}></Note>;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default NotesContainer;
