import React, { useState } from 'react';
import { Controlled as CodeMirrorComponent } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript'; 
import './CodePanel.css';

const code = `//Depth-First Search Algorithm
function Dfs(ocean, boatNode, treasureNode) {
  const nodesVisited = [];
  const stack = [];
  stack.push(boatNode);
  boatNode.isVisited = true;

  while (stack.length !== 0) {
      const currNode = stack.pop();
      nodesVisited.push(currNode);

      if (currNode === treasureNode) {
          return nodesVisited;
      }

      const neighbors = 
      UnvisitedNeighbors(currNode, ocean);

      for (const neighbor of neighbors) {
          neighbor.isVisited = true;
          neighbor.previousNode = currNode;
          stack.push(neighbor);
      }
  }

  return nodesVisited;
}`;

const DfsPanel = () => {
  const [isVisible, setIsVisible] = useState(true);

  const options = {
    linewrapping: true,
    lineNumbers: true,
    readOnly: true, 
    theme: 'material', 
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

export default DfsPanel;
