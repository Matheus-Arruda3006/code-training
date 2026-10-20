import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        1,
        0,
        5
      ],
      [
        1,
        4,
        5
      ],
      [
        1,
        5,
        5
      ],
      [
        1,
        9,
        5
      ]
    ],
    "expected": [
      0,
      1,
      0,
      1
    ]
  },
  {
    "input": [
      [
        0,
        2,
        1
      ],
      [
        0,
        1,
        1
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
  assert.throws(()=>solve([[-1,0,1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0,0,1])));
});
