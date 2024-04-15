



export function convertWorldGridStateToAdjacencyMatrix(worldGridState) {
  const adjacencyMap = {};
  const rows = worldGridState.length;
  const cols = worldGridState[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (worldGridState[i][j] !== 'obstacle') {
        const neighbors = {};

        // Computes for horizontal, vertical and diagonal
        // for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        //   const newX = i + dx;
        //   const newY = j + dy;

        //   if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && worldGridState[newX][newY] !== 'obstacle') {
        //     neighbors[`${newX}-${newY}`] = 1;
        //     // neighbors[`${newX}-${newY}`] = parseFloat(worldGridState[newX][newY]);
        //   }
        // }

        //Compute just horizontal and vertical
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const newX = i + dx;
          const newY = j + dy;

          if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && worldGridState[newX][newY] !== 'obstacle') {
            neighbors[`${newX}-${newY}`] = 1;
            // neighbors[`${newX}-${newY}`] = parseFloat(worldGridState[newX][newY]);
          }
        }

        //Compute just diagonal
        for (const [dx, dy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) {
          const newX = i + dx;
          const newY = j + dy;

          if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && worldGridState[newX][newY] !== 'obstacle') {
            neighbors[`${newX}-${newY}`] = Math.sqrt(2);
            // neighbors[`${newX}-${newY}`] = parseFloat(worldGridState[newX][newY]);
          }
        }

        adjacencyMap[`${i}-${j}`] = neighbors;
      }
    }
  }
  return adjacencyMap;
}
