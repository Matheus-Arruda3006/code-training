import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        0,
        10
      ],
      [
        1,
        1,
        20
      ],
      [
        2,
        0,
        0
      ],
      [
        3,
        1,
        0
      ]
    ],
    "expected": [
      1,
      2,
      2,
      3,
      3,
      1
    ]
  },
  {
    "input": [
      [
        1,
        0,
        1
      ],
      [
        1,
        0,
        2
      ]
    ],
    "expected": null
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
  assert.throws(()=>solve([[-1,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,0])));
});
