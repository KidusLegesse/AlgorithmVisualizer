import React from 'react';
import './App.css';
import MainOceanComponent from './MainApplication/MainOceanComponent';
function App() {
  return (
    <div className="App">
      <div className="banner">
        <div className="banner-content">
          <h1>Graph Algorithm Visualizer</h1>
        </div>
      </div>
      <MainOceanComponent></MainOceanComponent>
    </div>
  );
}

export default App;