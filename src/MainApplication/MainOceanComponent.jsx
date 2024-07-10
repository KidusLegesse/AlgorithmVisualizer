import React, {Component} from 'react';
import OceanWater from './OceanWater';
import {nodesInOrder , Bfs , Astar, Dijkstra, Dfs} from '../algorithms/AlgorithmInterface';
import DijkstraPanel from '../codedisplay/DijkstraPanel';
import BfsPanel from '../codedisplay/BfsPanel';
import DfsPanel from '../codedisplay/DfsPanel';
import AstarPanel from '../codedisplay/AstarPanel';
import BlankPanel from '../codedisplay/BlankPanel';
import StopIcon from '../Icons/StopIcon';
import RunIcon from '../Icons/RunIcon';
import ClearIceBergIcon from '../Icons/ClearIceBergIcon';
import ClearAllIcon from '../Icons/ClearAllIcon';
import ClearPathIcon from '../Icons/ClearPathIcon';
import RandomizeIcon from '../Icons/RandomizeIcon';
import ResetIcon from '../Icons/ResetIcon';
import './MainOceanComponent.css';


export default class MainOceanComponent extends Component {
  constructor() {
    super();
    this.state = {
      ocean: [],
      mousePress: false,
      boatRow: 10,
      boatCol: 10,
      treasureRow: 10,
      treasureCol: 30,
      isRunning: false,
      stopRunning: false,
      animationTimeouts: [],
      selectedAlgo: null,

    };
  }

  componentDidMount() {
    const ocean = createOcean();
    this.setState({ocean});
  }

  clearAnimationTimeouts = () => {
    this.state.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({ animationTimeouts: [] });
  };

  resetMap(algorithm) {
    this.clearAnimationTimeouts(); 
    const { ocean } = this.state;
    const newocean = ocean.map(row =>
      row.map(node => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      }))
    );

    const nodesToClear = document.querySelectorAll(`.visited, .${algorithm}`);
    nodesToClear.forEach(node => {
      node.classList.remove('visited');
      node.classList.remove(`${algorithm}`);
    });
    this.setState({ ocean: newocean });
  }
  
  clearIceBergs() {
    const { ocean } = this.state;
    const newocean = ocean.map(row =>
      row.map(node => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        iceberg: false, 
      }))
    );
    this.setState({ ocean: newocean });
  }

  clearAll(IceBerg) {
    if(IceBerg){
      this.clearIceBergs();
    }
    const nodesToClear = document.querySelectorAll('.visited, .dijkstra, .bfs, .dfs, .astar');
    nodesToClear.forEach(node => {
      node.classList.remove('visited');
      node.classList.remove('dijkstra');
      node.classList.remove('bfs');
      node.classList.remove('dfs');
      node.classList.remove('astar');
    });
  }
  

  clickingMouse(row, col) {
    if (this.state.isRunning) return;
    const newocean = updatedMap(this.state.ocean, row, col);
    this.setState({ocean: newocean, mousePress: true});
  }

  notClickingMouse() {
    this.setState({mousePress: false});
  }

  startAnimation (nodesVisted, pathOfAlgo, algorithm) {
    const timeouts = [];
    for (let i = 0; i <= nodesVisted.length; i++) {
      if (this.state.stopRunning) return;
      if (i === nodesVisted.length) {
        timeouts.push(setTimeout(() => {
          this.showPath(pathOfAlgo, algorithm);
          this.setState({ isRunning: true, stopRunning: false });
        }, 10 * i));
        break;
      }
      timeouts.push(setTimeout(() => {
        if (this.state.stopRunning) return;
        const node = nodesVisted[i];
        const nodeElement = document.getElementById(`${node.row}-${node.col}`);
        nodeElement.classList.remove('visited');
        void nodeElement.offsetWidth;
        nodeElement.classList.add('visited');
      }, 10 * i));
    }
    this.setState({ animationTimeouts: timeouts });
  }


  showPath(pathOfAlgo, algorithm) {
    const timeouts = [];
    for (let i = 1; i < pathOfAlgo.length; i++) {
      if (this.state.stopRunning) return;
      timeouts.push(setTimeout(() => {
        if (this.state.stopRunning) return;
        const node = pathOfAlgo[i];
        const nodeElement = document.getElementById(`${node.row}-${node.col}`);
        nodeElement.classList.remove(`${algorithm}`);
        void nodeElement.offsetWidth;
        nodeElement.classList.add(`${algorithm}`);

        if (i === pathOfAlgo.length - 1) {
          this.setState({ isRunning: false, stopRunning: false });
        }
      }, 50 * i));
    }
    this.setState({ animationTimeouts: timeouts });
  }

  simulateAlgo(algorithmName, algorithmFunction) {
    this.resetMap(algorithmName);
    this.setState({ isRunning: true });
    var nodesVisted = null;
    var pathOfAlgo = null;
    const { ocean, boatRow, boatCol, treasureRow, treasureCol } = this.state;
    const startNode = ocean[boatRow][boatCol];
    const finishNode = ocean[treasureRow][treasureCol];
    nodesVisted = algorithmFunction(ocean, startNode, finishNode);
    pathOfAlgo = nodesInOrder(finishNode);
    this.startAnimation (nodesVisted, pathOfAlgo, algorithmName);
  }

  handleAlgorithmChange() {
    const algorithmSelect = document.getElementById("algorithmSelect");
    const selectedAlgorithm = algorithmSelect.value;
    switch (selectedAlgorithm) {
        case "dijkstra":
            this.simulateAlgo("dijkstra", Dijkstra);
            break;
        case "bfs":
            this.simulateAlgo("bfs", Bfs);
            break;
        case "dfs":
            this.simulateAlgo("dfs", Dfs);
            break;
        case "astar":
          this.simulateAlgo("astar", Astar);
          break;
        default:
            break;
    }
  } 

  randomizeMap (reset) {
    this.clearAll(false);
    const { ocean } = this.state;
    const numRows = ocean.length;
    const numCols = ocean[0].length;

    let boatRow, boatCol, treasureRow, treasureCol;
    
    if (reset){
      boatRow = 10;
      boatCol = 10;
      treasureRow = 10;
      treasureCol = 30;
    }
    else{
      do {
        boatRow = Math.floor(Math.random() * numRows);
        boatCol = Math.floor(Math.random() * numCols);
      } while (boatRow === treasureRow && boatCol === treasureCol);

      do {
        treasureRow = Math.floor(Math.random() * numRows);
        treasureCol = Math.floor(Math.random() * numCols);
      } while ((treasureRow === boatRow && treasureCol === boatCol) || Math.abs(treasureRow - boatRow) < 10 ||
      Math.abs(treasureCol - boatCol) < 10);
    }

    this.setState({
      boatRow: boatRow,
      boatCol: boatCol,
      treasureRow: treasureRow,
      treasureCol: treasureCol,
    });

    const newocean = ocean.map((row, rowIndex) =>
      row.map((node, colIndex) => ({
        ...node,
        ship: rowIndex === boatRow && colIndex === boatCol,
        treasureChest: rowIndex === treasureRow && colIndex === treasureCol,
      }))
    );

    this.setState({ ocean: newocean });
  };

  handleVisualizeClick() {
    const { isRunning } = this.state;

    if (isRunning) {
      this.setState({ isRunning: false, stopRunning: true });
    } else {
      this.setState({ isRunning: true, stopRunning: false }, () => {
        this.handleAlgorithmChange();
      });
    }
  }
 
  handleSelectionChange = (event) => {
    this.setState({ selectedAlgo: event.target.value });
  };
  
  render() {
    const {ocean, mousePress, isRunning, selectedAlgo} = this.state;
    return (
      <>
      <div className="dropdown">
      <select id="algorithmSelect" disabled={isRunning} onChange={this.handleSelectionChange}>
          <option value="Select Your Algorithm:">Select Your Algorithm:</option>
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="astar">A*</option>
      </select>
    </div>
        <div className='button-container'>
          <button onClick={() => this.randomizeMap(false)} type="button" className="Randomize" disabled={isRunning}>
            <RandomizeIcon/>
          </button>
          <button onClick={() => this.randomizeMap(true)} type="button" className="Reset" disabled={isRunning}>
            <ResetIcon/>
          </button>
          <button onClick={() => this.clearIceBergs()} type="button" className="clearIceBergs" disabled={isRunning}>
            <ClearIceBergIcon/>
          </button>
          <button onClick={() => this.clearAll(false)} type="button" className="ClearPath" disabled={isRunning}>
            <ClearPathIcon/>
          </button>
          <button onClick={() => this.clearAll(true)} type="button" className="ClearAll" disabled={isRunning}>
            <ClearAllIcon/>
          </button>
          <button onClick={() => this.handleVisualizeClick()} type="button" className={isRunning ? "Stop": "Run"}>
            {isRunning && <StopIcon/>}
            {!isRunning && <RunIcon/>}
          </button>
        </div>
        <div className='container'>
          <div className="ocean">
            {ocean.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, treasureChest, ship, iceberg} = node;
                    return (
                      <OceanWater
                        key={nodeIdx}
                        col={col}
                        treasureChest={treasureChest}
                        ship={ship}
                        iceberg={iceberg}
                        mousePress={mousePress}
                        onMouseDown={(row, col) => this.clickingMouse(row, col)}
                        onMouseUp={() => this.notClickingMouse()}
                        row={row}></OceanWater>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {selectedAlgo === 'Select Your Algorithm:' && <BlankPanel/>}
        {selectedAlgo === null && <BlankPanel/>}
        {selectedAlgo === 'bfs' && <BfsPanel/>}
        {selectedAlgo === 'dfs' && <DfsPanel/>}
        {selectedAlgo === 'dijkstra' && <DijkstraPanel/>}
        {selectedAlgo === 'astar' && <AstarPanel/>}
      </>
    );
  }
}

const createOcean = () => {
  const ocean = [];
  for (let row = 0; row < 23; row++) {
    const currRow = [];
    for (let col = 0; col < 40; col++) {
      currRow.push(createWater(col, row));
    }
    ocean.push(currRow);
  }
  return ocean;
};

const createWater = (col, row) => {
  return {
    col,
    row,
    ship: row === 10 && col === 10,
    treasureChest: row === 10 && col === 30,
    distance: Infinity,
    isVisited: false,
    iceberg: false,
    previousNode: null,
  };
};

const updatedMap = (ocean, row, col) => {
  const newocean = ocean.slice();
  const node = newocean[row][col];
  const newNode = {
    ...node,
    iceberg: !node.iceberg,
  };
  newocean[row][col] = newNode;
  return newocean;
};

