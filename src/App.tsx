import React from 'react';
import './App.css';
import {Board} from "./Components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board mines={10} height={10} width={10}/>
      </header>

    </div>
  );
}

export default App;
