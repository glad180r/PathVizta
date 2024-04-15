import { worldGridParameters } from "../main.js"


export function basicRandomMaze(){
  // Generate number of obstacles about 35% the size of the world grid
  const numberOfObstaclesToGenerate = Math.floor(0.35 * worldGridParameters.rows * worldGridParameters.columns);

  // Initialize Obstacle Array
  let obstacleArray = [];

  // Generate Required Number of Obstacles and Push to Array
  for(let i = 0; i < numberOfObstaclesToGenerate; i++){
    obstacleArray.push(generateRandomObstacleCell(worldGridParameters));
  }
  return obstacleArray;
}


function generateRandomObstacleCell(worldGridParameters) {
  let validRowRange = [0, worldGridParameters.rows];
  let validColumnRange  = [0, worldGridParameters.columns];

  let obstacleRow =  Math.random() * (validRowRange[1] - validRowRange[0]) + validRowRange[0]; //Math.random() * (max - min) + min;
  let obstacleColumn = Math.random() * (validColumnRange[1] - validColumnRange[0]) + validColumnRange[0];
  
  return [Math.floor(obstacleRow), Math.floor(obstacleColumn)];
}

