import { createSlice } from "@reduxjs/toolkit";

interface noteInterface {
  id: number;
  content: string;
}
interface currentNotesArray {
  currentNotes: noteInterface[];
  editedNotes: noteInterface[];
  varsInNotes: string[];
  varsInContent: string[];
}

const storedNotes =
  localStorage.getItem("notes") != null
    ? JSON.parse(localStorage.getItem("notes")!)
    : [];

/*const extractVars = (contentToProc: string) => {
  const rx = /\$\{(.*?)\}/g;
  let foundVar;
  let varsInContent = [];
  while ((foundVar = rx.exec(contentToProc))) {
    varsInContent.push(foundVar[0]);
  }
  return varsInContent;
};
*/

const getAllVars = (notesArr: Array<noteInterface>) => {
  let varsArr: Array<Array<string>> = [];
  let varsCtntArr: Array<Array<string>> = [];
  notesArr.forEach((note) => {
    const rx = /\$\{(.*?)\}/g;
    let foundVar;
    let varsToSub = [];
    let varsInContent = [];
    while ((foundVar = rx.exec(note.content))) {
      varsToSub.push(foundVar[0]);
      varsInContent.push(foundVar[1]);
    }
    varsArr.push(varsToSub);
    varsCtntArr.push(varsInContent);
  });
  return {varsToSub: varsArr.flat(), varsInContent: varsCtntArr.flat()};
};

const varsInNotes = getAllVars(storedNotes).varsToSub;
const varsInContent = getAllVars(storedNotes).varsInContent;

const substitutedNotes = (notesToProcess: Array<noteInterface>) => {
  let correctedNotes: Array<noteInterface> = [];
  notesToProcess.forEach((noteX) => {
    let finalNote = noteX.content;
    varsInNotes.forEach((varNote) => {
      if (finalNote.includes(varNote)) {
        finalNote = finalNote.replaceAll(varNote, "teststring");
      }
    });
    correctedNotes.push({ id: noteX.id, content: finalNote });
  });
  return correctedNotes;
};

const editedNotes = substitutedNotes(storedNotes);

const notesInitialState: currentNotesArray = {
  currentNotes: storedNotes,
  editedNotes: editedNotes,
  varsInNotes: varsInNotes,
  varsInContent: varsInContent
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
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
