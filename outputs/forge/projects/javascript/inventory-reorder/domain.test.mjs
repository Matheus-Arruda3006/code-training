import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        20,
        5,
        5,
        10,
        12
      ],
      [
        100,
        2,
        3,
        5,
        10
      ]
    ],
    "expected": [
      24,
      0
    ]
  },
  {
    "input": [
      [
        0,
        0,
        0,
        1,
        5
      ]
    ],
    "expected": [
      5
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
  assert.throws(()=>solve([[-1,0,0,0,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0,0,1])));
});
