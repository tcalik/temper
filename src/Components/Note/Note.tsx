import React, { PropsWithChildren } from "react";

interface NoteProps {
  content: string;
}

const Note = (props: NoteProps) => {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  );
};

export default Note;
