import React from "react";
import Note from "../Note/Note";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import "./NotesContainer.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NoteInterface from "../../Interfaces/NoteInterface";
import NoteEditorArea from "../NoteEditorArea/NoteEditorArea";
import { useSelector } from "react-redux";

const NotesContainer = () => {
  const savedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.currentNotes
  );

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
          2400: 8,
        }}
      >
        <Masonry>
          <NoteEditorArea></NoteEditorArea>
          {savedNotes.map((value: NoteInterface) => {
            return <Note key={value.id} id={value.id}></Note>;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default NotesContainer;
