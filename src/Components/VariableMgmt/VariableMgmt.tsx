import React from "react";
import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notesStore";

interface VariableMgmtInterface {
  varName: string;
  varId: number;
  currSub: string;
}

const VariableMgmt = (props: VariableMgmtInterface) => {
  const dispatch = useDispatch();

  const handleSubstitution = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      notesActions.substituteVariable({
        id: props.varId,
        substituteText: event.target.value,
      })
    );
  };
  return (
    <div className="SingleVar">
      <label>{props.varName}</label>
      <input onChange={handleSubstitution} value={props.currSub} type="text" />
    </div>
  );
};

export default VariableMgmt;
