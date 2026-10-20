import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        10,
        2
      ],
      [
        -1,
        1
      ],
      [
        10,
        5
      ]
    ],
    "expected": [
      1,
      2,
      0
    ]
  },
  {
    "input": [
      [
        0,
        1
      ],
      [
        0,
        1
      ]
    ],
    "expected": [
      0,
      1
    ]
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
  assert.throws(()=>solve([[-10001,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[-10000,1])));
});
