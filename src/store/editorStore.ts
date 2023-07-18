import { createSlice } from "@reduxjs/toolkit";

const initialState = { showEditor: false };

const editorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    toggleEditor(state) {
      state.showEditor = !state.showEditor;
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;