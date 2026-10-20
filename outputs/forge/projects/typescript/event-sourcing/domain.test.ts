import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        1,
        100
      ],
      [
        2,
        -30
      ],
      [
        1,
        100
      ]
    ],
    "expected": [
      100,
      70,
      70
    ]
  },
  {
    "input": [
      [
        1,
        1
      ],
      [
        1,
        2
      ]
    ],
    "expected": null
  },
  {
    "input": [],
    "expected": []
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1,-10000]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,-10000])));
});
