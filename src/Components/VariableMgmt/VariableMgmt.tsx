import React from "react";
import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notesStore";

interface VariableMgmtInterface {
  varName: string;
  varId: number;
}

const VariableMgmt = (props: VariableMgmtInterface) => {
  const dispatch = useDispatch();

  const handleSubstitution = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    dispatch(notesActions.substituteVariable({id: props.varId, substituteText: event.target.value}))
  };

  return (
    <div>
      <label>{props.varName}</label>
      <input onChange={handleSubstitution} type="text" />
    </div>
  );
};

export default VariableMgmt;
