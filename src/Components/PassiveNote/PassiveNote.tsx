import React, { MouseEventHandler } from "react";

interface PassiveNotePropsInterface{
  copyContent: MouseEventHandler;
  activateEdit: MouseEventHandler;
  content: string;
}

const PassiveNote = (props: PassiveNotePropsInterface) => {
  return (
    <div>
      <div>{props.content}</div>
      <button onClick={props.activateEdit}>Edit</button>
      <button onClick={props.copyContent}>Copy</button>
    </div>
  );
};
export default PassiveNote;
