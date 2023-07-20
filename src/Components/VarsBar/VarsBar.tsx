import React from "react";
import { useSelector } from "react-redux";

const VarsBar = () => {
  const varsInNotes = useSelector((state: any) => state.notes.varsInContent);
  console.log(varsInNotes);
  return (
    <div>
      {varsInNotes.map((va: string, id: number) => {
       return <label key={id}>{va}</label>;
      })}
    </div>
  );
};

export default VarsBar;
