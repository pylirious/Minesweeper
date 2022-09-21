import React from 'react';
import './App.css';
import {Board} from "./Components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board mines={40} height={16} width={16}/>
      </header>

    </div>
  );
}

export default App;
