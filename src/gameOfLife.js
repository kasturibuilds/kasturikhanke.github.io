// Cell values are ages; zero means dead. The board has non-wrapping edges.
export function stepLife(current, next, columns, rows) {
  next.fill(0);
  let population = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if ((!dx && !dy) || x + dx < 0 || x + dx >= columns || y + dy < 0 || y + dy >= rows) continue;
          if (current[(y + dy) * columns + x + dx]) neighbors++;
        }
      }
      const index = y * columns + x;
      if (neighbors === 3 || (current[index] && neighbors === 2)) {
        next[index] = Math.min(65535, current[index] + 1);
        population++;
      }
    }
  }
  return population;
}

export function seedLife(grid, columns, rows, x, y, generous = false) {
  const plant = (dx, dy) => {
    const col = x + dx, row = y + dy;
    if (col >= 0 && col < columns && row >= 0 && row < rows) {
      const index = row * columns + col;
      if (!grid[index]) grid[index] = 1;
    }
  };
  if (!generous) {
    // R-pentomino: five cells with a long, varied evolution.
    [[0,-1],[1,-1],[-1,0],[0,0],[0,1]].forEach(([dx,dy]) => plant(dx,dy));
    return;
  }
  // A symmetric seed produces branching, pixelated colonies under Life's rules.
  for (let dy = -11; dy <= 11; dy++) {
    for (let dx = -11; dx <= 11; dx++) {
      const a = Math.abs(dx), b = Math.abs(dy);
      if (a + b <= 16 && ((a * 13 + b * 7 + a * b * 3) % 11) < 5) plant(dx,dy);
    }
  }
}

export function lifeColor(age) {
  if (age < 3) return '#b9b5ba';
  if (age < 6) return '#a1b0b2';
  if (age < 10) return '#989eaf';
  if (age < 16) return '#a2aca1';
  return '#b3a0ad';
}
