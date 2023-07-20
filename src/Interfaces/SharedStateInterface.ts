import EditorStateInterface from "./EditorStateInterface";
import NotesStateInterface from "./NotesStateInterface";

export default interface SharedStateInterface{
  notes: NotesStateInterface;
  editor: EditorStateInterface;
}