import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Board} from "./Components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board mines={10} height={10} width={10}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
