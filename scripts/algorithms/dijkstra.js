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
`


// export function dStarLite(inputData){
//   let worldGridState = inputData.worldGridState;
//   let specialCells = inputData.specialCells;


//   const algorithmOutput = {
//     'visitedCells':   [[10,20],[9,20],[11,20],[10,21],[10,22],[10,23],[10,24],[10,25],[10,26],[10,27],[10,28],[10,29],[10,30],[10,31],[10,32],[10,33],[10,34],[10,35]],
//     'shortestPath':   [[10,20],[10,21],[10,22],[10,23],[10,24],[10,25],[10,26],[10,27],[10,28],[10,29],[10,30],[10,31],[10,32],[10,33],[10,34],[10,35]]
//   }

  

//  //just the visitedCells for now
//    visualizationRunner(algorithmOutput, inputData); // Run the visualization. May need to wait for algorithm runner to finish? async await?
// }

export function useDijkstra(inputData){
  let adjacencyMap = convertWorldGridStateToAdjacencyMatrix(inputData.worldGridState);
  // runDijkstra(adjacencyMap);

  let specialCells = inputData.specialCells;

  let start = `${specialCells.start[0]}-${specialCells.start[1]}`;
  let goal = `${specialCells.goal[0]}-${specialCells.goal[1]}`;

  visualizationRunner(runDijkstra(adjacencyMap, start, goal), inputData); // Run the visualization. May need to wait for algorithm runner to finish? async await?
}


  // Add your Dijkstra's algorithm implementation here

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

function dijkstra(adjacencyMap, start, end) {
  console.log(adjacencyMap);
  const distances = {};
  const previousNodes = {};
  const visitedCells = [];

  // Initialize distances with Infinity and set the distance of the start node to 0
  for (const node in adjacencyMap) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(start, 0);

  while (!priorityQueue.isEmpty()) {
    const currentNode = priorityQueue.dequeue();
    visitedCells.push(currentNode);

    if (currentNode === end) {
      // Reached the destination, reconstruct the path
      const shortestPath = [];
      let current = end;
      while (current) {
        shortestPath.unshift(current);
        current = previousNodes[current];
      }
      return { visitedCells, shortestPath };
    }

    const neighbors = adjacencyMap[currentNode];
    for (const neighbor in neighbors) {
      const newDistance = distances[currentNode] + neighbors[neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previousNodes[neighbor] = currentNode;
        priorityQueue.enqueue(neighbor, newDistance);
      }
    }
  }

  // If the destination is not reached, return the visited cells without a valid path
  return { visitedCells, shortestPath: [] };
}

// Function to run Dijkstra's algorithm and update visualization
function runDijkstra(adjacencyMap, start, goal) {
  const { visitedCells, shortestPath } = dijkstra(adjacencyMap, start, goal);
  console.log(visitedCells)
  console.log(shortestPath);

  const algorithmOutput = {
    'visitedCells': visitedCells,
    'shortestPath': shortestPath
  }
  return algorithmOutput;
}