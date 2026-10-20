import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        0,
        1,
        5
      ],
      [
        0,
        2,
        2
      ],
      [
        2,
        1,
        1
      ]
    ],
    "expected": [
      0,
      3,
      2,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ]
  },
  {
    "input": [
      [
        1,
        2,
        1
      ]
    ],
    "expected": [
      0,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ]
  },
  {
    "input": [],
    "expected": [
      0,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
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
