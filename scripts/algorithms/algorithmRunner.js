import { useAStar } from './aStar.js'
import { useDijkstra } from './dijkstra.js'
import { freezeGridChanges } from '../grid/gridUtilities.js';

export function algorithmRunner(inputData){
  // Freeze the grid state to stop user from making changes
  freezeGridChanges();

  // Select algorithm
  switch(inputData.selectedAlgorithm) {
    case 'dijkstra':
      useDijkstra(inputData);
      break;
    case 'a-star':
      useAStar(inputData);
      break;
  }
}

