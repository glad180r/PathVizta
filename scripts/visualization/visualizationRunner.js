

export function visualizationRunner(algorithmOutput, inputData){
  let visualizationSpeed = inputData.visualizationSpeed;

  // Selecting numerical value for visualization speed
  visualizationSpeed = visualizationSpeed === 'fast' ? 10 : visualizationSpeed === 'medium' ? 100 : visualizationSpeed === 'slow' ? 200 : undefined;

  let specialCells = inputData.specialCells;


let visualizationState = 'visited-cells';

visualizationState = visualizeVisitedCells(algorithmOutput, specialCells, visualizationSpeed);


setTimeout(()=>{ //waiting for a period based on the time it will take to animate the visited cells
  visualizeShortestPath(algorithmOutput, specialCells, visualizationSpeed)
},algorithmOutput.visitedCells.length * visualizationSpeed);
  // consider disabling obstacle addition and start and goal cell changes while visuzalization is running
}


//Simple transitions
function visualizeVisitedCells(algorithmOutput, specialCells, visualizationSpeed){
  let start = specialCells.start;
  let goal = specialCells.goal;
  //Loop through search path and apply visualizing styles to them
    algorithmOutput.visitedCells.forEach((node, i) => {
      let [row, column] = node.split("-");
      if((row !== start[0] || column !== start[1]) && (row !== goal[0] || column !== goal[1])){ // executing only for non-goal / non-start cells
        setTimeout(()=> {
        // document.getElementById(`${node[0]}-${node[1]}`).classList.add('animating-visited-cells');
        document.getElementById(`${row}-${column}`).classList.add('animating-visited-cells');
          }, i*visualizationSpeed);
        }    
      })
  return 'shortest-path'
}


function visualizeShortestPath(algorithmOutput, specialCells, visualizationSpeed){
    let start = specialCells.start;
    let goal = specialCells.goal;
  //Loop through search path and apply visualizing styles to them
  algorithmOutput.shortestPath.forEach((node, i) => {
    let [row, column] = node.split("-");
    if((row !== start[0] || column !== start[1]) && (row !== goal[0] || column !== goal[1])){ // executing only for non-goal / non-start cells
      setTimeout(()=> {
        document.getElementById(`${row}-${column}`).classList.add('animating-shortest-path');
      }, i*visualizationSpeed);
    } 
  })
}

