import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        10000,
        1000,
        1000,
        800
      ],
      [
        100,
        200,
        500,
        100
      ]
    ],
    "expected": [
      800,
      0
    ]
  },
  {
    "input": [
      [
        999,
        0,
        1000,
        1000
      ]
    ],
    "expected": [
      99
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
  assert.throws(()=>solve([[-1,0,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0,0])));
});
