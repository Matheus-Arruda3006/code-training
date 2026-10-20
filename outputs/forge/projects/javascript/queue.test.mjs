import test from 'node:test';
import assert from 'node:assert/strict';
import { mapLimit } from './queue.mjs';

test('limita concorrência e preserva ordem', async () => {
  let active = 0, peak = 0;
  const result = await mapLimit([3, 1, 2], 2, async value => {
    active++; peak = Math.max(peak, active);
    await new Promise(resolve => setTimeout(resolve, value * 5));
    active--;
    return value * 2;
  });
  assert.deepEqual(result, [6, 2, 4]);
  assert.equal(peak, 2);
});
test('valida limite, vazio e falha', async () => {
  await assert.rejects(mapLimit([1], 0, x => x), RangeError);
  assert.deepEqual(await mapLimit([], 2, x => x), []);
  await assert.rejects(mapLimit([1], 1, () => { throw new Error('falha'); }), /falha/);
});
