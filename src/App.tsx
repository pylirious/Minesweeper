import React from 'react';
import './App.css';
import {Board} from "./Components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board mines={50} height={16} width={24}/>
      </header>

    </div>
  );
}

export default App;
