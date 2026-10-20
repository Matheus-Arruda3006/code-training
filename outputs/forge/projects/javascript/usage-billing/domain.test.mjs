import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        0
      ],
      [
        100
      ],
      [
        150
      ],
      [
        250
      ]
    ],
    "expected": [
      0,
      1000,
      1400,
      2050
    ]
  },
  {
    "input": [
      [
        1
      ],
      [
        200
      ]
    ],
    "expected": [
      10,
      1800
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
  assert.throws(()=>solve([[-1]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[0])));
});
