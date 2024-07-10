import React, { useState } from 'react';
import { Controlled as CodeMirrorComponent } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css'; 
import 'codemirror/mode/javascript/javascript'; 
import './CodePanel.css';

const code = `//A* Algorithm
function Astar(ocean, boatNode, treasureNode) {
  const nodesVisited = [];
  boatNode.distance = 0;
  boatNode.ManhattanDistance =
   Math.abs(boatNode.row - treasureNode.row) 
   + Math.abs(boatNode.col - treasureNode.col);

  const listOfNodes = [boatNode];
  while (listOfNodes.length > 0) {
    listOfNodes.sort((nodeA, nodeB) => {
      const costA = nodeA.distance + 
      nodeA.ManhattanDistance;

      const costB = nodeB.distance + 
      nodeB.ManhattanDistance;

      return costA - costB;
    });
    const closestNode = listOfNodes.shift();
    if (closestNode.isVisited) continue;
    closestNode.isVisited = true;
    nodesVisited.push(closestNode);

    if (closestNode === treasureNode)
    return nodesVisited;

    const neighbors = 
    UnvisitedNeighbors(closestNode, ocean);
    for (const neighbor of neighbors) {
      const distance = closestNode.distance + 1;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.ManhattanDistance = 
        Math.abs(neighbor.row - treasureNode.row) +
        Math.abs(neighbor.col - treasureNode.col);

         neighbor.previousNode = closestNode;
        if (!listOfNodes.includes(neighbor)) {
          listOfNodes.push(neighbor);
        }
      }
    }
  }
  return nodesVisited;
}`;

const AstarPanel = () => {
  const [isVisible, setIsVisible] = useState(true); 

  const options = {
    linewrapping: true,
    lineNumbers: true,
    readOnly: true, 
    theme: 'dracula',
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

export default AstarPanel;
