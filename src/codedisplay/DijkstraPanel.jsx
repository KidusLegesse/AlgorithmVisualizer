import React, { useState } from 'react';
import { Controlled as CodeMirrorComponent } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/abbott.css'; 
import 'codemirror/mode/javascript/javascript'; 
import './CodePanel.css';

const code = `//Dijkstra's Algorithm
function Dijkstra(ocean, boatNode, treasureNode) {
  const nodesVisited = [];
  boatNode.distance = 0;

  const nodes = [];
  for (const row of ocean) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  const unvisitedNodes = nodes;
  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => 
      nodeA.distance - nodeB.distance);

    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    
    if (closestNode.distance === Infinity) 
    return nodesVisited;

    closestNode.isVisited = true;
    nodesVisited.push(closestNode);
    if (closestNode === treasureNode) 
    return nodesVisited;

    const unvisitedNeighbors = 
    UnvisitedNeighbors(closestNode, ocean);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = closestNode.distance + 1;
      neighbor.previousNode = closestNode;
    }
  }
}`;

const DijkstraPanel = () => {
  const [isVisible, setIsVisible] = useState(true); 

  const options = {
    linewrapping: true,
    lineNumbers: true,
    readOnly: true, 
    theme: 'abbott', 
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

export default DijkstraPanel;
