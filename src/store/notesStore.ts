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
  substitute: string,
  subId: number
) => {
  let correctedNotes: Array<NoteInterface> = [];
  notesToProcess.forEach((noteX) => {
    let finalNote = noteX.content;
    variablesAvail.forEach((varNote) => {
      if (
        finalNote.includes(varNote.varRaw) &&
        (varNote.id === subId || subId === -1)
      ) {
        finalNote = finalNote.replaceAll(varNote.varRaw, substitute);
      }
    });
    correctedNotes.push({ id: noteX.id, content: finalNote });
  });
  return correctedNotes;
};

const editedNotes = substitutedNotes(storedNotes, "", -1);

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
    },
    editNote(state, action) {
      const editedNoteIndex = state.currentNotes.findIndex(
        (obj) => obj.id === action.payload.id
      );

      const editedNoteObj = {
        id: action.payload.id,
        content: action.payload.text,
      };
      state.currentNotes[editedNoteIndex] = editedNoteObj;
      localStorage.setItem("notes", JSON.stringify(state.currentNotes));
    },
    substituteVariable(state, action) {
      state.variablesAvailable[action.payload.id].substitution =
        action.payload.substituteText;
      state.editedNotes = substitutedNotes(
        state.currentNotes,
        state.variablesAvailable[action.payload.id].substitution,
        action.payload.id
      );
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
