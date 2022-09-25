import React from 'react';
import './App.css';
import {Board} from "./Components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board mines={99} height={16} width={30}/>
      </header>

    </div>
  );
}

export default App;
