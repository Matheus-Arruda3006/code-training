import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1000,
        15,
        30
      ],
      [
        999,
        1,
        30
      ]
    ],
    "expected": [
      500,
      33
    ]
  },
  {
    "input": [
      [
        100,
        32,
        31
      ]
    ],
    "expected": null
  },
  {
    "input": [
      [
        100,
        0,
        28
      ]
    ],
    "expected": [
      0
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
