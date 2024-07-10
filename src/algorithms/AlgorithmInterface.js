export function UnvisitedNeighbors(node, ocean) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(ocean[row - 1][col]);
  if (row < ocean.length - 1) neighbors.push(ocean[row + 1][col]);
  if (col > 0) neighbors.push(ocean[row][col - 1]);
  if (col < ocean[0].length - 1) neighbors.push(ocean[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.iceberg);
}

export function nodesInOrder(treasureNode) {
  const NodesInOrder = [];
  let currNode = treasureNode;
  while (currNode !== null) {
    NodesInOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return NodesInOrder;
}

export function Bfs(ocean, boatNode, treasureNode) {
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

      const neighbors = UnvisitedNeighbors(currNode, ocean);
      for (const neighbor of neighbors) {
          neighbor.isVisited = true;
          neighbor.previousNode = currNode;
          queue.push(neighbor);
      }
  }

  return nodesVisited;
}

export function Dfs(ocean, boatNode, treasureNode) {
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

      const neighbors = UnvisitedNeighbors(currNode, ocean);
      for (const neighbor of neighbors) {
          neighbor.isVisited = true;
          neighbor.previousNode = currNode;
          stack.push(neighbor);
      }
  }

  return nodesVisited;
}

export function Dijkstra(ocean, boatNode, treasureNode) {
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
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    const closestNode = unvisitedNodes.shift();

    if (closestNode.iceberg) continue;

    if (closestNode.distance === Infinity) return nodesVisited;
    closestNode.isVisited = true;
    nodesVisited.push(closestNode);
    if (closestNode === treasureNode) return nodesVisited;

    const unvisitedNeighbors = UnvisitedNeighbors(closestNode, ocean);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = closestNode.distance + 1;
      neighbor.previousNode = closestNode;
    }
  }
}

export function Astar(ocean, boatNode, treasureNode) {
  const nodesVisited = [];
  boatNode.distance = 0;
  boatNode.ManhattanDistance = Math.abs(boatNode.row - treasureNode.row) + Math.abs(boatNode.col - treasureNode.col);
  const listOfNodes = [boatNode];

  while (listOfNodes.length > 0) {
    listOfNodes.sort((nodeA, nodeB) => {
      const costA = nodeA.distance + nodeA.ManhattanDistance;
      const costB = nodeB.distance + nodeB.ManhattanDistance;
      return costA - costB;
    });
    const closestNode = listOfNodes.shift();

    if (closestNode.isVisited) continue;
    closestNode.isVisited = true;
    nodesVisited.push(closestNode);

    if (closestNode === treasureNode) return nodesVisited;

    const neighbors = UnvisitedNeighbors(closestNode, ocean);
    for (const neighbor of neighbors) {
      const distance = closestNode.distance + 1;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.ManhattanDistance = Math.abs(neighbor.row - treasureNode.row) + Math.abs(neighbor.col - treasureNode.col);


        neighbor.previousNode = closestNode;
        if (!listOfNodes.includes(neighbor)) {
          listOfNodes.push(neighbor);
        }
      }
    }
  }

  return nodesVisited;
}
