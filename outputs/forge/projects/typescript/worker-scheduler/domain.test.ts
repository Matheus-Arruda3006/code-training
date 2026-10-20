import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        0,
        5
      ],
      [
        0,
        2
      ],
      [
        0,
        3
      ],
      [
        1,
        1
      ]
    ],
    "expected": [
      0,
      5,
      1,
      2,
      2,
      3,
      1,
      3
    ]
  },
  {
    "input": [
      [
        10,
        2
      ]
    ],
    "expected": [
      0,
      12
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
  assert.throws(()=>solve([[-1,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,1])));
});
