import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        1,
        5
      ],
      [
        2,
        4
      ],
      [
        4,
        6
      ]
    ],
    "expected": [
      2,
      2
    ]
  },
  {
    "input": [
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "expected": [
      1,
      1
    ]
  },
  {
    "input": [],
    "expected": [
      0,
      -1
    ]
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0])));
});
