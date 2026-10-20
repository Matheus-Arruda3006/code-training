import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        10000,
        5,
        9990
      ],
      [
        1000,
        2,
        9990
      ]
    ],
    "expected": [
      5,
      0,
      0,
      1
    ]
  },
  {
    "input": [
      [
        1,
        2,
        9000
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
  assert.throws(()=>solve([[0,0,0]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[1,0,0])));
});
