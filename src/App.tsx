import React from "react";
import "./App.css";
import NotesContainer from "./Components/NotesContainer/NotesContainer";
import VarsBar from "./Components/VarsBar/VarsBar";
function App() {
 

  return (
    <div className="App">
      <div className="MainHeader">Temper</div>
      <VarsBar></VarsBar>
      <NotesContainer></NotesContainer>
    </div>
  );
}

export default App;
