import { createSlice } from "@reduxjs/toolkit";
import VariablesInterface from "../Interfaces/VariablesInterface";
import NotesStateInterface from "../Interfaces/NotesStateInterface";
import NoteInterface from "../Interfaces/NoteInterface";

const storedNotes =
  localStorage.getItem("notes") != null
    ? JSON.parse(localStorage.getItem("notes")!)
    : [];

const getAllVars = (notesArr: Array<NoteInterface>) => {
  let varsToSub: Array<string> = [];

  let varindex = 0;
  const emptyString = "";
  let varsAvail: Array<VariablesInterface> = [];
  notesArr.forEach((note) => {
    const rx = /\$\{(.*?)\}/g;
    let foundVar;

    while ((foundVar = rx.exec(note.content))) {
      if (!varsToSub.includes(foundVar[0])) {
        varsToSub.push(foundVar[0]);
        varsAvail.push({
          id: varindex,
          varRaw: foundVar[0],
          varName: foundVar[1],
          substitution: emptyString,
        });
      }
      varindex++;
    }
  });
  return varsAvail;
};

const variablesAvail = getAllVars(storedNotes);

const substitutedNotes = (
  notesToProcess: Array<NoteInterface>,
  currentVariables: Array<VariablesInterface>
) => {
  let correctedNotes: Array<NoteInterface> = [];
  notesToProcess.forEach((noteX) => {
    let finalNote = noteX.content;
    currentVariables.forEach((varNote) => {
      if (finalNote.includes(varNote.varRaw) && varNote.substitution !== "") {
        finalNote = finalNote.replaceAll(varNote.varRaw, varNote.substitution);
      }
    });
    correctedNotes.push({ id: noteX.id, content: finalNote });
  });
  return correctedNotes;
};

const editedNotes = substitutedNotes(storedNotes, variablesAvail);

const notesInitialState: NotesStateInterface = {
  currentNotes: storedNotes,
  editedNotes: editedNotes,
  variablesAvailable: variablesAvail,
};


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

      state.variablesAvailable=getAllVars(state.currentNotes);
      state.editedNotes = substitutedNotes(
        state.currentNotes,
        state.variablesAvailable
      );
    },
    editNote(state, action) {
      const editedNoteIndex = state.currentNotes.findIndex(
        (obj) => obj.id === action.payload.id
      );
      const editedNoteObj = {
        id: action.payload.id,
        content: action.payload.text,
      };
      localStorage.setItem("notes", JSON.stringify(state.currentNotes));

      state.currentNotes[editedNoteIndex] = editedNoteObj;
      state.variablesAvailable=getAllVars(state.currentNotes);
      state.editedNotes = substitutedNotes(
        state.currentNotes,
        state.variablesAvailable
      );
    },
    deleteNote(state, action) {
      const editedNoteIndex = state.currentNotes.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.currentNotes.splice(editedNoteIndex, 1);
      state.variablesAvailable=getAllVars(state.currentNotes);
      localStorage.setItem("notes", JSON.stringify(state.currentNotes));
    },
    substituteVariable(state, action) {
      state.variablesAvailable[action.payload.id].substitution =
        action.payload.substituteText;
      state.editedNotes = substitutedNotes(
        state.currentNotes,
        state.variablesAvailable
      );
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
