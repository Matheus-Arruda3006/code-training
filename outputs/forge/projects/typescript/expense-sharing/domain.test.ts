import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        1,
        10
      ],
      [
        1,
        0
      ],
      [
        1,
        0
      ]
    ],
    "expected": [
      4,
      3,
      3
    ]
  },
  {
    "input": [
      [
        1,
        10
      ],
      [
        3,
        0
      ]
    ],
    "expected": [
      3,
      7
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
  assert.throws(()=>solve([[0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[1,0])));
});
