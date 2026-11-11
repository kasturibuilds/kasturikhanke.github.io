import test from 'node:test';
import assert from 'node:assert/strict';
import { stepLife, seedLife, lifeColor } from '../src/gameOfLife.js';
const board = (points, size = 7) => {
  const cells = new Uint16Array(size * size);
  points.forEach(([x, y, age = 1]) => { cells[y * size + x] = age; });
  return cells;
};
const occupied = (cells, size = 7) => [...cells].flatMap((age, index) => age ? [[index % size, Math.floor(index / size)]] : []);
test('a block stays alive and ages without mutating the previous generation', () => {
  const current = board([[2,2],[3,2],[2,3],[3,3]]), next = new Uint16Array(49);
  const original = current.slice();
  assert.equal(stepLife(current, next, 7, 7), 4);
  assert.deepEqual(occupied(next), occupied(current));
  assert.deepEqual(current, original);
  assert.equal(next[16], 2);
});
test('a blinker rotates synchronously; births start at age one', () => {
  const current = board([[2,3],[3,3],[4,3]]), next = new Uint16Array(49);
  stepLife(current, next, 7, 7);
  assert.deepEqual(occupied(next), [[3,2],[3,3],[3,4]]);
  assert.equal(next[17], 1);
  assert.equal(next[24], 2);
  stepLife(next, current, 7, 7);
  assert.deepEqual(occupied(current), [[2,3],[3,3],[4,3]]);
});
test('a glider moves diagonally after four generations', () => {
  let current = board([[2,1],[3,2],[1,3],[2,3],[3,3]]), next = new Uint16Array(49);
  for (let i = 0; i < 4; i++) { stepLife(current,next,7,7); [current,next] = [next,current]; }
  assert.deepEqual(occupied(current), [[3,2],[4,3],[2,4],[3,4],[4,4]]);
});
test('lonely cells die, edges do not wrap, and old cells do not overflow', () => {
  const current = board([[0,0],[6,0],[0,6],[6,6]]), next = new Uint16Array(49);
  assert.equal(stepLife(current,next,7,7), 0);
  const block = board([[0,0,65535],[1,0,65535],[0,1,65535],[1,1,65535]]);
  stepLife(block,next,7,7);
  assert.equal(next[0],65535);
});
test('seeding preserves existing ages and stays within bounds', () => {
  const cells = new Uint16Array(49);
  cells[0] = 20;
  seedLife(cells,7,7,0,0,true);
  assert.equal(cells[0],20);
  assert.ok(cells.some(age => age === 1));
  assert.notEqual(lifeColor(1),lifeColor(20));
});
