import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./notesStore";
import editorReducer from "./editorStore";

const store = configureStore({
  reducer:{ editor: editorReducer, notes: notesReducer }
});

export default store;