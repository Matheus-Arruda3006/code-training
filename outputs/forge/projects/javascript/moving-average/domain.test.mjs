import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './domain.mjs';
const cases = [
  {
    "input": [
      [
        10
      ],
      [
        20
      ],
      [
        30
      ],
      [
        100
      ]
    ],
    "expected": [
      10,
      15,
      20,
      50
    ]
  },
  {
    "input": [
      [
        1
      ],
      [
        2
      ]
    ],
    "expected": [
      1,
      1
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
