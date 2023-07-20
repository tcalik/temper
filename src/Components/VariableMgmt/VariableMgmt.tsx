import React from "react";

interface VariableMgmtInterface{
  variableName: string;
}

const VariableMgmt = (props: VariableMgmtInterface) => {
  return (
    <div>
      <label>{props.variableName}</label>
      <input type="text" />
    </div>
  );
};

export default VariableMgmt;
