import { createSlice } from "@reduxjs/toolkit";

interface noteState {
  currentNotes: string[];
}
const notesInitialState: noteState = { currentNotes: [] };

const notesSlice = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    addNote(state, action) {
      state.currentNotes = [...state.currentNotes, action.payload];
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
