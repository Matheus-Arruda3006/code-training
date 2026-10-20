import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        0
      ],
      [
        10
      ],
      [
        11
      ],
      [
        50
      ],
      [
        101
      ]
    ],
    "expected": [
      2,
      4,
      4,
      5
    ]
  },
  {
    "input": [
      [
        100
      ]
    ],
    "expected": [
      0,
      0,
      1,
      1
    ]
  },
  {
    "input": [],
    "expected": [
      0,
      0,
      0,
      0
    ]
  }
];
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[-1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0])));
});
