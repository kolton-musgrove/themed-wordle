import React from 'react'
import Wordle from './wordle'
import './main.css';

function App() {
  return (
    <div>
      <header>
        <p>Themed Wordle</p>
        <ul>
          <li>Help</li>
          <li>Statistics</li>
          <li>Settings</li>
        </ul>
      </header>
      <main>
        <Wordle />
      </main>
    </div>
  );
}

export default App;
