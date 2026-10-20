import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        30,
        100
      ],
      [
        20,
        70
      ],
      [
        40,
        120
      ]
    ],
    "expected": [
      170
    ]
  },
  {
    "input": [
      [
        26,
        10
      ]
    ],
    "expected": [
      10
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
  assert.throws(()=>solve([[0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[1,0])));
});
