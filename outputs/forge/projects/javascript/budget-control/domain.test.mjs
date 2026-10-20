import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        100,
        80
      ],
      [
        1,
        0,
        30
      ],
      [
        2,
        50,
        20
      ]
    ],
    "expected": [
      1,
      0,
      1,
      50
    ]
  },
  {
    "input": [
      [
        0,
        0,
        1
      ]
    ],
    "expected": [
      0,
      0
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
  assert.throws(()=>solve([[-1,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0])));
});
