import { simpleStairPattern } from './simpleStairPattern.js'
import { basicRandomMaze } from './basicRandomMaze.js'
import { recursiveDivision } from './recursiveDivision.js'

import { resetWorldGrid, readWorldGridState, extractStartAndGoalCellsFromWorldGridState } from '../grid/gridUtilities.js';
import { worldGridParameters } from '../main.js';




export function generateMaze(selectedMaze){
  resetWorldGrid(worldGridParameters);
  let obstacleArray = selectedMaze === 'simple-stair-pattern' ? simpleStairPattern() :
                      selectedMaze === 'basic-random-maze' ? basicRandomMaze() :
                      selectedMaze === 'recursive-division' ? recursiveDivision() : [];
  

  let specialCells = extractStartAndGoalCellsFromWorldGridState(readWorldGridState(worldGridParameters), worldGridParameters);
  
  let finalObstacleArray = []
  obstacleArray.forEach((obstacleNode) => {
    // filtering for the start cell
    if(obstacleNode[0] !== specialCells.start[0] || obstacleNode[1] !== specialCells.start[1]){ //current cell not start cell
      if(obstacleNode[0] !== specialCells.goal[0] || obstacleNode[1] !== specialCells.goal[1]){ //current cell not goal cell
        finalObstacleArray.push(obstacleNode); //add to obstacle array
        document.getElementById(`${obstacleNode[0]}-${obstacleNode[1]}`).dataset.celltype = 'obstacle'; //push obstacle status to the DOM
      }
    }
  })
  // Render obstacles to the world grid with visualization
  finalObstacleArray.forEach((obstacleNode, i) => {
    setTimeout(()=> {
      document.getElementById(`${obstacleNode[0]}-${obstacleNode[1]}`).classList.add('animating-maze-obstacle'); //push obstacle status to the DOM
    }, i*10);
  })
}
