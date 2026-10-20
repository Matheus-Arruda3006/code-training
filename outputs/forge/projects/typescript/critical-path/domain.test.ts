import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        -1,
        5
      ],
      [
        -1,
        3
      ],
      [
        0,
        4
      ],
      [
        1,
        2
      ]
    ],
    "expected": [
      5,
      3,
      9,
      5,
      9
    ]
  },
  {
    "input": [
      [
        0,
        1
      ]
    ],
    "expected": null
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
  assert.throws(()=>solve([[-2,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[-1,1])));
});
