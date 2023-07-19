import React from "react";

const ActiveNote = (props:any) => {

  const saveEditedNote = () =>{
    props.saveNote();
  }

  return (<div>
    <textarea defaultValue={props.content}></textarea>
    <button onClick={props.cancelEdit}>Cancel</button>
    <button onClick={saveEditedNote}>Save</button>
  </div>);
};

export default ActiveNote;
