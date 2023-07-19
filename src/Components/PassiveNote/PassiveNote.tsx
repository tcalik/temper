import React from "react";

const PassiveNote = (props: any) => {


  return (
    <div>
      <div>{props.content}</div>
      <button onClick={props.activateEdit}>Edit</button>
      <button onClick={props.copyContent}>Copy</button>
    </div>
  );
};
export default PassiveNote;
