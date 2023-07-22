import React from "react";
import "./App.css";
import NotesContainer from "./Components/NotesContainer/NotesContainer";
import VarsBar from "./Components/VarsBar/VarsBar";
function App() {
 

  return (
    <div className="App">
      <VarsBar></VarsBar>
      <NotesContainer></NotesContainer>
    </div>
  );
}

export default App;
