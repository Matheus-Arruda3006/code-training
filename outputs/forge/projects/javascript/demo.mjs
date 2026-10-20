import { mapLimit } from './queue.mjs';
const result = await mapLimit([3, 1, 2], 2, async value => {
  await new Promise(resolve => setTimeout(resolve, value * 10));
  return value * 2;
});
console.log(result);
