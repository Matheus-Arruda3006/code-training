import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        90,
        3,
        100
      ],
      [
        100,
        0,
        100
      ],
      [
        10,
        0,
        100
      ]
    ],
    "expected": [
      4,
      0,
      -1
    ]
  },
  {
    "input": [
      [
        0,
        1,
        1
      ]
    ],
    "expected": [
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
  assert.throws(()=>solve([[-1,0,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,1])));
});
