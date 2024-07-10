import React, { useState } from 'react';
import { Controlled as CodeMirrorComponent } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css'; 
import 'codemirror/mode/javascript/javascript';
import './CodePanel.css';

const code = `//Breadth-First Search Algorithm
function Bfs(ocean, boatNode, treasureNode) {
  const nodesVisited = [];
  const queue = [];
  queue.push(boatNode);
  boatNode.isVisited = true;

  while (queue.length !== 0) {
      const currNode = queue.shift();
      nodesVisited.push(currNode);

      if (currNode === treasureNode) {
          return nodesVisited;
      }

      const neighbors = 
      UnvisitedNeighbors(currNode, ocean);

      for (const neighbor of neighbors) {
          neighbor.isVisited = true;
          neighbor.previousNode = currNode;
          queue.push(neighbor);
      }
  }

  return nodesVisited;
}`;

const BfsPanel = () => {
  const [isVisible, setIsVisible] = useState(true);

  const options = {
    linewrapping: true,
    lineNumbers: true,
    readOnly: true, 
    theme: 'material-ocean', 
  };

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
    <div className={`panel ${isVisible ? 'open' : ''}`}>
      <div className="toggle" onClick={togglePanel}>
        <span className={`arrow ${isVisible ? 'open' : ''}`}></span>
      </div>
      <CodeMirrorComponent
        value={code}
        className='codeMirrorcomponent'
        options={options}
      />      
    </div>
    </>
  );
};

export default BfsPanel;
