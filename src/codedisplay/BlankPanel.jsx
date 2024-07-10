import React, { useState } from 'react';
import { Controlled as CodeMirrorComponent } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css'; 
import 'codemirror/mode/javascript/javascript'; 
import './CodePanel.css';

const code = `//Select an algorithm to see its implementation:

function Bfs(ocean, boatNode, treasureNode) {
  // Select Bfs to reveal implementation
}
function Dfs(ocean, boatNode, treasureNode) {
  // Select Dfs to reveal implementation
}
function Dijkstra(ocean, boatNode, treasureNode) {
  // Select Dijkstra to reveal implementation
}
function Astar(ocean, boatNode, treasureNode) {
  // Select Astar to reveal implementation
}

//Helper Functions:

function UnvisitedNeighbors(node, ocean) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) 
  neighbors.push(ocean[row - 1][col]);

  if (row < ocean.length - 1) 
  neighbors.push(ocean[row + 1][col]);

  if (col > 0) 
  neighbors.push(ocean[row][col - 1]);

  if (col < ocean[0].length - 1) 
  neighbors.push(ocean[row][col + 1]);

  return neighbors.filter(neighbor => 
    !neighbor.isVisited && !neighbor.isWall);
}

function nodesInOrder(treasureNode) {
  const NodesInOrder = [];
  let currNode = treasureNode;
  while (currNode !== null) {
    NodesInOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return NodesInOrder;
}`
;

const BlankPanel = () => {
  const [isVisible, setIsVisible] = useState(true); 

  const options = {
    linewrapping: true,
    lineNumbers: true,
    readOnly: true, 
    theme: 'ayu-dark', 
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

export default BlankPanel;
