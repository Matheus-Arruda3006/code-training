import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        0,
        10
      ],
      [
        1,
        0,
        20
      ],
      [
        1,
        1,
        -3
      ]
    ],
    "expected": [
      1,
      -1,
      2,
      7
    ]
  },
  {
    "input": [
      [
        0,
        1,
        10
      ]
    ],
    "expected": [
      -1,
      0
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
  assert.throws(()=>solve([[-1,0,-10000]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,-10000])));
});
