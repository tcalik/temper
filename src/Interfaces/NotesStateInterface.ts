import VariablesInterface from "./VariablesInterface";
import NoteInterface from "./NoteInterface";

export default interface NotesStateInterface {
  currentNotes: NoteInterface[];
  editedNotes: NoteInterface[];
  variablesAvailable: VariablesInterface[];
}
