import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        6,
        1,
        1
      ],
      [
        2,
        10,
        1
      ],
      [
        1,
        2,
        0
      ],
      [
        5,
        8,
        1
      ]
    ],
    "expected": [
      3
    ]
  },
  {
    "input": [
      [
        0,
        1,
        0
      ]
    ],
    "expected": [
      -1
    ]
  },
  {
    "input": [],
    "expected": [
      -1
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
