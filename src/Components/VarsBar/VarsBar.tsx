import React from "react";
import { useSelector } from "react-redux";
import VariableMgmt from "../VariableMgmt/VariableMgmt";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import VariablesInterface from "../../Interfaces/VariablesInterface";
import "./VarsBar.css"

const VarsBar = () => {
  const varsInNotes = useSelector(
    (state: SharedStateInterface) => state.notes.variablesAvailable
  );

  return (
    <div className="VariablesBar">
      {varsInNotes.map((va: VariablesInterface, id: number) => {
        return (
          <VariableMgmt key={id} varId={id} varName={va.varName}></VariableMgmt>
        );
      })}
    </div>
  );
};

export default VarsBar;
