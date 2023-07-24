import React from "react";
import { useDispatch, useSelector } from "react-redux";
import VariableMgmt from "../VariableMgmt/VariableMgmt";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import VariablesInterface from "../../Interfaces/VariablesInterface";
import "./VarsBar.css";
import { notesActions } from "../../store/notesStore";

const VarsBar = () => {
  const dispatch = useDispatch();

  const varsInNotes = useSelector(
    (state: SharedStateInterface) => state.notes.variablesAvailable
  );

  const clearVars = () => {
    dispatch(notesActions.clearVariables());
  };
  return (
    <div className="VariablesBar">
      <div className="NameHeader">
        <h2>Temper</h2>
      </div>
      <div className="ButtonContainer">
        <button className="ClearVarsButton" onClick={clearVars}>
          Clear all variables
        </button>
      </div>
      {varsInNotes.map((va: VariablesInterface, id: number) => {
        return (
          <VariableMgmt
            key={id}
            varId={id}
            varName={va.varName}
            currSub={va.substitution}
          ></VariableMgmt>
        );
      })}
    </div>
  );
};

export default VarsBar;
