import React, { useState } from "react";

const ActiveNote = (props: any) => {
  const [draftNoteContent, setDraftNoteContent] = useState(props.content);

  const draftCurrentNote = (event: any) => {
    setDraftNoteContent(event.target.value);
  };

  const saveEditedNote = () => {
    props.saveNote(draftNoteContent);
  };

  return (
    <div>
      <textarea
        defaultValue={props.content}
        onChange={draftCurrentNote}
      ></textarea>
      <button onClick={props.cancelEdit}>Cancel</button>
      <button onClick={saveEditedNote}>Save</button>
    </div>
  );
};

export default ActiveNote;
