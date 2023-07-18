import React, { useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import { editorActions } from "../../store/editorStore";
import { useDispatch, useSelector } from "react-redux";

const NotesContainer = () => {
  const dispatch = useDispatch();
  const toggleEditorHandler = () => {
    dispatch(editorActions.toggleEditor());
  };
  const [i, setI] = useState(0);
  const noteEditorOpen = useSelector((state: any) => state.editor.showEditor);

  const draftNewNote = () => {
    setI(i + 1);
    toggleEditorHandler();
  };

  return (
    <div>
      {noteEditorOpen && <NoteEditor></NoteEditor>}
      <p>{i}</p>
      {!noteEditorOpen && <button onClick={draftNewNote}>+</button>}
    </div>
  );
};
export default NotesContainer;
