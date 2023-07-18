import { createSlice, configureStore } from "@reduxjs/toolkit";

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

const store = configureStore({
  reducer: editorSlice.reducer
});

export const editorActions = editorSlice.actions;
export default store;