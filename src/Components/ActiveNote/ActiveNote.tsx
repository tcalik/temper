import React, { MouseEventHandler, useState } from "react";
interface ActiveNotePropsInterface {
  saveNote: Function;
  cancelEdit: MouseEventHandler;
  content: string;
}
const ActiveNote = (props: ActiveNotePropsInterface) => {
  const [draftNoteContent, setDraftNoteContent] = useState(props.content);

  const draftCurrentNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
