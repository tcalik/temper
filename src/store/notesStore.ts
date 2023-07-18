import { createSlice } from "@reduxjs/toolkit";

interface noteInterface {
  id: number;
  content: string;
}
interface currentNotesArray {
  currentNotes: noteInterface[];
}

const storedNotes =
  localStorage.getItem("notes") != null
    ? JSON.parse(localStorage.getItem("notes")!)
    : [];

console.log(storedNotes);

const notesInitialState: currentNotesArray = { currentNotes: storedNotes };

const notesSlice = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    addNote(state, action) {
      state.currentNotes = [
        ...state.currentNotes,
        { id: action.payload.id, content: action.payload.draftContent },
      ];
      localStorage.setItem("notes", JSON.stringify(state.currentNotes));
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
