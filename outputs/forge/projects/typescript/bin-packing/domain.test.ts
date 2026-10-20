import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.js';
const cases = [
  {
    "input": [
      [
        60
      ],
      [
        50
      ],
      [
        40
      ],
      [
        50
      ]
    ],
    "expected": [
      0,
      1,
      0,
      1,
      2
    ]
  },
  {
    "input": [
      [
        100
      ],
      [
        1
      ]
    ],
    "expected": [
      0,
      1,
      2
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
  assert.throws(()=>solve([[0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[1])));
});
