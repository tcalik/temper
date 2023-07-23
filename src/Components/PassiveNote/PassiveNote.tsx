import React, { MouseEventHandler } from "react";
import "./PassiveNote.css";

interface PassiveNotePropsInterface {
  copyContent: MouseEventHandler;
  activateEdit: MouseEventHandler;
  content: string;
}

const PassiveNote = (props: PassiveNotePropsInterface) => {
  return (
    <div>
      <div className="ButtonBar">
        <button className="NoteButton EditButton" onClick={props.activateEdit}>
          Edit
        </button>
        <button className="NoteButton CopyButton" onClick={props.copyContent}>
        </button>
      </div>
      <div className="PassiveNoteText">{props.content}</div>
    </div>
  );
};
export default PassiveNote;
