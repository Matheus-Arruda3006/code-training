import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        0,
        10,
        100,
        0
      ],
      [
        3,
        10,
        50,
        10
      ]
    ],
    "expected": [
      5,
      35
    ]
  },
  {
    "input": [
      [
        12,
        100,
        10,
        100
      ]
    ],
    "expected": [
      9
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
  assert.throws(()=>solve([[-1,1,1,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,1,1,0])));
});
