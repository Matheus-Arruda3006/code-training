import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        9,
        5,
        10
      ],
      [
        15,
        3,
        10
      ],
      [
        10,
        2,
        10
      ]
    ],
    "expected": [
      5,
      2,
      1
    ]
  },
  {
    "input": [
      [
        0,
        7,
        1
      ]
    ],
    "expected": [
      7
    ]
  },
  {
    "input": [],
    "expected": [
      0
    ]
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0])));
});
