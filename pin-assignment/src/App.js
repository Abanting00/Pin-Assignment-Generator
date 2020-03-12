import React from 'react';
import './App.css';
import NavH from './Component/NavH';
import BoardWrapper from './Component/BoardWrapper';

function App() {
  return (
    <div className="App">
      <NavH/>
      <div className="center">
        <BoardWrapper/>
      </div>
    </div>
  );
}

export default App;
