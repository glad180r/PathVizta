import { visualizationRunner } from '../visualization/visualizationRunner.js'
import { convertWorldGridStateToAdjacencyMatrix } from './utilities/adjacency.js'

`
To be called in algorithmRunner() function from algorithmRunner.js

Expected Input: worldGridState => 2D-array of rows and columns storing possible values of 'empty', 'obstacle', 'start' or 'goal'

Expected Output Format:
  const algorithmOutput = {
    'visitedCells':   [[10,20],[9,20],[11,20],[10,21],[10,22],[10,23],[10,24],[10,25],[10,26],[10,27],[10,28],[10,29],[10,30],[10,31],[10,32],[10,33],[10,34],[10,35]],
    'shortestPath':   [[10,20],[10,21],[10,22],[10,23],[10,24],[10,25],[10,26],[10,27],[10,28],[10,29],[10,30],[10,31],[10,32],[10,33],[10,34],[10,35]]
  }

  (i) visitedCells => an array of all visited cells in search process. Will always start with start cell and end with goal if successful or terminate if no path available
  (ii) shortestPath => an array of the shortest path discovered by the algorithm

  Store cells as [row, column]

  its sean
`


export function useAStar(inputData){
  let worldGridState = inputData.worldGridState;
  let adjacencyMap = convertWorldGridStateToAdjacencyMatrix(inputData.worldGridState);
  // runDijkstra(adjacencyMap);

  let specialCells = inputData.specialCells;

  let start = `${specialCells.start[0]}-${specialCells.start[1]}`;
  let goal = `${specialCells.goal[0]}-${specialCells.goal[1]}`;

  visualizationRunner(runAStar(adjacencyMap, start, goal), inputData); // Run the visualization. May need to wait for algorithm runner to finish? async await?
 // visualizationRunner(algorithmOutput, inputData); // Run the visualization. May need to wait for algorithm runner to finish? async await?
}

class PriorityQueue {
    constructor() {
      this.nodes = [];
    }

    enqueue(node, priority) {
      this.nodes.push({ node, priority });
      this.sort();
    }

    dequeue() {
      return this.nodes.shift().node;
    }

    sort() {
      this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
      return !this.nodes.length;
    }
  }

  function calculateHeuristic(node, end) {
    // A simple heuristic: Manhattan distance
    const [x1, y1] = node.split('-').map(Number);
    const [x2, y2] = end.split('-').map(Number);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  function aStar(adjacencyMap, start, end) {
    const gScores = {};
    const fScores = {};
    const cameFrom = {};
    const visitedCells = [];

    for (const node in adjacencyMap) {
      gScores[node] = Infinity;
      fScores[node] = Infinity;
    }

    gScores[start] = 0;
    fScores[start] = calculateHeuristic(start, end);

    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start, fScores[start]);

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();
      visitedCells.push(currentNode);

      if (currentNode === end) {
        // Reached the destination, reconstruct the path
        const shortestPath = reconstructPath(cameFrom, end);
        return { visitedCells, shortestPath };
      }

      const neighbors = adjacencyMap[currentNode];
      for (const neighbor in neighbors) {
        const tentativeGScore = gScores[currentNode] + neighbors[neighbor];

        if (tentativeGScore < gScores[neighbor]) {
          cameFrom[neighbor] = currentNode;
          gScores[neighbor] = tentativeGScore;
          fScores[neighbor] = gScores[neighbor] + calculateHeuristic(neighbor, end);

          if (!priorityQueueHasNode(priorityQueue, neighbor)) {
            priorityQueue.enqueue(neighbor, fScores[neighbor]);
          }
        }
      }
    }

    // If the destination is not reached, return the visited cells without a valid path
    return { visitedCells, shortestPath: [] };
  }

  function priorityQueueHasNode(priorityQueue, node) {
    return priorityQueue.nodes.some(item => item.node === node);
  }

  function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom[current]) {
      current = cameFrom[current];
      path.unshift(current);
    }
    return path;
  }

  function runAStar(adjacencyMap, start, goal) {
    const { visitedCells, shortestPath } = aStar(adjacencyMap, start, goal);
    console.log(visitedCells)
    console.log(shortestPath);

    const algorithmOutput = {
      'visitedCells': visitedCells,
      'shortestPath': shortestPath
    }
    return algorithmOutput;
}