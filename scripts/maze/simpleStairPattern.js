import { worldGridParameters } from "../main.js"


export function simpleStairPattern(){
  let obstacleArray = [];

  // Start from bottom leftmost cell
  let currentCell = [worldGridParameters.rows - 1, 0];
  
  // First diagonal (up and right).Stops when we hit (including) topmost row (0) => {x-1, y+1}
  for(let i = currentCell[0] ; i >= 0; i--){ // [22, 0] to [0, 21]
    obstacleArray.push([currentCell[0], currentCell[1]]);
    currentCell = [currentCell[0] - 1, currentCell[1] + 1];
  }


  // Second diagonal (down and right).Stops when we hit (not including) bottom-most row (worldGridParameters.rows - 1) => {x+1, y+1}
  currentCell = [0, worldGridParameters.rows - 1]; //[0, 21] to [20, 41]
  for(let i = 0; i < worldGridParameters.rows - 1; i++){
    obstacleArray.push([currentCell[0], currentCell[1]]);
    currentCell = [currentCell[0] + 1, currentCell[1] + 1];
  }

  currentCell = [20, 41] // [19, 42] to [1, 52]
  // Final diagonal (up and right).Stops when we hit (not including) topmost row (0) => {x-1, y+1}
  for(let j = 41 ; j < worldGridParameters.columns - 2; j++){
    currentCell = [currentCell[0] - 1, currentCell[1] + 1];
    obstacleArray.push(currentCell);
  }

  return obstacleArray;
}




